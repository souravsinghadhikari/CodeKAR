import { Editor } from "@monaco-editor/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { AiOutlineLoading } from "react-icons/ai";
import Submissions from "../components/Submissions"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { baseurl } from "@/utils/common"
export default function QuestionById() {
    const params = useParams()
    const [code, SetCode] = useState<string>(`
function func(a) {
    //logic here
}
        
console.log(func(a));
        `);
    const [submit, setSubmit] = useState<any>()
    const [confirm, setConfirm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState("question")
    const QueryQuestionByid = useQuery({
        queryKey: ['question', params.id],
        queryFn: async () => {
            const resposne = await axios.get(`${baseurl}/questions/question/${params.id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            return resposne.data
        }
    })

    const handleSubmit = async () => {
        setLoading(true)
        setSubmit("")
        const response = await axios.post(`${baseurl}/submissions/submission`, {
            code: code,
            language: "63",
            questionId: params.id
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        )
        console.log(response.data)
        console.log(confirm)
        while (confirm) {
            console.log("in while")
            await new Promise((resolve) => { setTimeout(resolve, 1000) })
            const data = await axios.get(`${baseurl}/submissions/submission/${response.data.data}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            if (data.data.data.completed) {
                setConfirm(false)
                setSubmit(data.data.data)
                setLoading(false)
                break
            }
        }
        setConfirm(true)

    }
    if (QueryQuestionByid.isLoading) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Loading...</div>
    }
    if (QueryQuestionByid.isError) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Error</div>
    }
    return <div className="w-full min-h-screen">
        <div className="w-full h-screen hidden bg-neutral-900 text-white   lg:flex justify-center items-center pt-16 ">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={35}>
                    <div className=" h-full  text-black flex flex-col justify-center items-center">
                        <div className="w-full h-[8%] border-b-2 border-black bg-zinc-800">
                            <div className="w-full h-full flex justify-around items-center">
                                <button onClick={() => {
                                    setTab("question")
                                }} className={` w-[48%] h-5/6 rounded-sm   ${(tab === "question") ? "bg-gray-200  " : "hover:bg-zinc-500 text-white bg-zinc-900 "} transition-all`}>Question</button>
                                <button onClick={() => {
                                    setTab("submissions")
                                }} className={` w-[48%] h-5/6 p-2 rounded-sm   ${(tab === "submissions") ? "bg-gray-200 " : "hover:bg-zinc-500 text-white bg-zinc-900 "} transition-all`}>Submissions</button>
                            </div>
                        </div>
                        {tab === "question" ? <div className="w-full flex space-y-4 flex-col justify-start text-white items-start h-[92%] px-5">
                            <div>
                                <p className="text-2xl font-bold pt-5">{QueryQuestionByid.data.data.question}</p>
                                <p className="text-gray-200" >{QueryQuestionByid.data.data.description}</p>
                            </div>
                            <p className="text-xl font-semibold">Examples:</p>
                            <div className="border-2 w-full flex justify-between px-5 items-center bg-zinc-800 rounded-lg border-zinc-600 p-2">
                                <div className="flex justify-center items-center  gap-2">
                                    <p className=" ">Sample Input:</p>
                                    <p className="text-gray-200"> {QueryQuestionByid.data.data.sampleInput1}</p>
                                </div>
                                <div className="flex justify-center items-center  gap-2">
                                    <p className=" ">Sample Output:</p>
                                    <p className="text-gray-200">{QueryQuestionByid.data.data.sampleOutput1}</p>
                                </div>
                            </div>
                            <div className="border-2 w-full flex justify-between px-5 items-center bg-zinc-800 rounded-lg border-zinc-600 p-2">
                                <div className="flex justify-center items-center  gap-2">
                                    <p className=" ">Sample Input:</p>
                                    <p className="text-gray-200"> {QueryQuestionByid.data.data.sampleInput2}</p>
                                </div>
                                <div className="flex justify-center items-center  gap-2">
                                    <p className=" ">Sample Output:</p>
                                    <p className="text-gray-200">{QueryQuestionByid.data.data.sampleOutput2}</p>
                                </div>
                            </div>

                        </div> : null}
                        {tab === "submissions" ? <div className="w-full h-[92%]">
                            <Submissions SetCode={SetCode} id={params.id!} />
                        </div> : null}
                    </div>
                </ResizablePanel>
                <ResizableHandle className=" px-[2px] bg-black" withHandle />
                <ResizablePanel defaultSize={65}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={70}>
                            <div className="h-full w-full">
                                <Editor value={code} onChange={(e) => {
                                    SetCode(e!)
                                }} defaultLanguage="javascript" theme={"vs-dark"} />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle className=" py-[2px] bg-black" withHandle />
                        <ResizablePanel defaultSize={30}>
                            <div className="h-full w-full flex justify-start items-center bg-neutral-900 px-5">
                                {submit ? <div className="flex flex-col  justify-between h-full py-5 items-start">
                                    <h1>Correct : {submit.passedcases} ✅</h1>
                                    <h1>Incorrect : {submit.failedcases} ❌</h1>
                                    <h1>Total: {submit.totalcases}</h1>
                                    <h1>Correct: {submit.correct ? "true" : "false"}</h1>
                                </div> : <div></div>}
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            <button disabled={loading} onClick={handleSubmit} className="bg-green-500 disabled:hover:cursor-not-allowed disabled:bg-green-200 hover:bg-green-700 text-white fixed bottom-5 right-5 font-bold py-2 px-4 rounded">{loading ? <AiOutlineLoading className="animate-spin text-black" /> : "submit"}</button>


        </div>
        <div className="h-screen w-full lg:hidden flex justify-center text-white items-center bg-neutral-900">
            use bigger screen
        </div>
    </div>
}