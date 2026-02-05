import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";
import { baseurl } from "@/utils/common";
export default function CodeEditor() {
    const [code, setCode] = useState("");
    const [submit, setSubmit] = useState<any>()
    const [confirm, setConfirm] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        setSubmit("")
        const response = await axios.post(`${baseurl}/submissions/submission`, {
            code: code,
            language: "63",
            questionId: "1e738c76-8f07-442b-af20-8b6d1046323f"
        }, {
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3NjkwZTA5LTZlNzctNGVhOS1iZDdjLTc1YmEzMmZiMmQyYiIsImlhdCI6MTczMTA3MDY2NH0.dUHBmdTwfSHYq5LHJEK6Bt_Ao5QNqsmrpnhexQbkT4M'
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
                    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3NjkwZTA5LTZlNzctNGVhOS1iZDdjLTc1YmEzMmZiMmQyYiIsImlhdCI6MTczMTA3MDY2NH0.dUHBmdTwfSHYq5LHJEK6Bt_Ao5QNqsmrpnhexQbkT4M'
                }
            })
            if (data.data.data.completed) {
                setConfirm(false)
                setSubmit(data.data)
                setLoading(false)
                break
            }
        }
        setConfirm(true)

    }
    return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">

        {(submit) ? <div className="flex justify-between w-3/4 my-4 items-center  ">
            <p>passedcases: {submit.data.passedcases}</p>
            <p>failedcases: {submit.data.failedcases}</p>
            <p>totalcases: {submit.data.totalcases}</p>
            <p>correct: {(submit.data.correct) ? "yes" : "no"}</p>
        </div> : ""}

        <p></p>
        <p>{confirm}</p>
        <p>{loading}</p>
        <Editor onChange={(e) => {
            setCode(e!)
        }} height="90vh" theme={"vs-dark"} className="border-2" width={"90vw"} defaultLanguage="javascript"  ></Editor>
        <button disabled={loading} onClick={() => handleSubmit()} className="disabled:bg-gray-600 fixed bottom-5 right-5 px-3 py-1 bg-black rounded-sm text-white">{(loading) ? "..." : "submit"}</button>
    </div >
}