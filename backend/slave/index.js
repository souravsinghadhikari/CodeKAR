import axios from "axios";
import { createClient } from "redis";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

function executeLocally(code, language, input) {
    return new Promise((resolve) => {
        const id = uuidv4();
        const dir = path.join(process.cwd(), "temp", id);

        try {
            fs.mkdirSync(dir, { recursive: true });
        } catch (err) {
            return resolve({ error: "Failed to create temp directory" });
        }

        let filename;
        let compileCommand = null;
        let runCommand;

        // 🔹 Language Config (Windows)
        if (language === "cpp" || language === "cpp17") {
            filename = "main.cpp";
            compileCommand = "g++ main.cpp -o main.exe";
            runCommand = "main.exe";
        } 
        else if (language === "python" || language === "python3") {
            filename = "main.py";
            runCommand = "python main.py";
        } 
        else {
            return resolve({ error: "Unsupported language" });
        }

        try {
            fs.writeFileSync(path.join(dir, filename), code);
        } catch (err) {
            return resolve({ error: "Failed to write source file" });
        }

        const command = compileCommand
            ? `${compileCommand} && ${runCommand}`
            : runCommand;

        const child = exec(
            command,
            { cwd: dir, timeout: 3000 },
            async (error, stdout, stderr) => {
                try {
                    await fs.promises.rm(dir, { recursive: true, force: true });
                } catch (cleanupError) {
                    console.error("Cleanup failed:", cleanupError.message);
                }

                if (error) {
                    return resolve({
                        error: stderr || error.message
                    });
                }

                resolve({
                    output: stdout.trim()
                });
            }
        );

        // 🔹 Properly pass input to program
        if (input) {
            child.stdin.write(input);
        }
        child.stdin.end();
    });
}

const JUDGE0_URL = process.env.JUDGE0_URL || "http://localhost:2358";
const LANGUAGE_MAP = {
    cpp: 54,
    cpp17: 54,
    cpp20: 76,
    c: 50,
    python: 71,
    python3: 71,
    javascript: 63,
    java: 62,
};

async function slave() {
    const client = createClient();

    client.on("error", (err) => console.error("Redis Client Error", err));

    await client.connect();
    console.log("Connected to Redis. Waiting for submissions...");

    while (true) {
        try {
            // brPop returns { key: 'submissions', element: '...' } or null
            const submissionData = await client.brPop("submissions", 0);

            if (submissionData) {
                const receivedBody = JSON.parse(submissionData.element);
                console.log("Processing submission:", receivedBody.submissionId);

                let result = {
                    passedCases: 0,
                    failedCases: 0,
                    totalCases: receivedBody.testcases.length,
                    correct: false,
                    userId: receivedBody.userId
                };

                // Map testcases to a list of promises
                await Promise.all(
                    receivedBody.testcases.map(async (testcase) => {
                        const encodedSource = Buffer.from(receivedBody.code).toString('base64')

                        const body = {
                            language_id: LANGUAGE_MAP[receivedBody.language],
                            source_code: encodedSource,
                            stdin: testcase.input,
                            expected_output: testcase.output,
                        };

                        console.log(body);

                        try {
                            // 1. Submit to Judge0
                            // const response = await axios.post(
                            //     `${JUDGE0_URL}/submissions`,
                            //     body
                            // );

                            // const token = response.data.token;

                            // // 2. Wait before polling
                            // await new Promise(resolve => setTimeout(resolve, 6000));

                            // // 3. Poll Judge0 for result
                            // const response2 = await axios.get(
                            //     `${JUDGE0_URL}/submissions/${token}`
                            // );

                            // console.log(response2.data);

                            // // 4. Evaluate result
                            // if (response2.data.status?.description === "Accepted") {
                            //     result.passedCases += 1;
                            // } else {
                            //     result.failedCases += 1;
                            // }

                            const response = await executeLocally(
                                receivedBody.code,
                                receivedBody.language,
                                testcase.input
                            );

                            if (!response.error && response.output === testcase.output.trim()) {
                                result.passedCases += 1;
                            } else {
                                result.failedCases += 1;
                            }

                        } catch (err) {
                            console.error("Error processing testcase:", err.message);
                            result.failedCases += 1;
                        }

                    })
                );

                result.correct = result.passedCases === result.totalCases;

                // Update the main backend
                try {
                    console.log(result);
                    await axios.put(`http://localhost:4000/api/v1/submissions/submission/${receivedBody.submissionId}`, {
                        passedcases: result.passedCases,
                        failedcases: result.failedCases,
                        totalcases: result.totalCases,
                        correct: result.correct,
                        userId: result.userId
                    });
                    console.log(`Submission ${receivedBody.submissionId} updated successfully.`);
                } catch (err) {
                    console.error("Error updating submission result:", err.response?.data || err.message);
                }
            }
        } catch (error) {
            console.error("Fatal Worker Error:", error.message);
            // Optional: retry logic or process exit
            await client.quit();
            break;
        }
    }
}

slave();