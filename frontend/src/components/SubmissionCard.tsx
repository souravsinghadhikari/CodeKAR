import { useEffect, useState } from "react"

export default function SubmissionCard(props: {
    submission: {
        code: string,
        id: string,
        passedcases: number,
        totalcases: number,
        createdAt: any
    },
    SetCode: (code: string) => void
}) {
    const [color, setColor] = useState("text-zinc-800")
    useEffect(() => {
        if (props.submission.passedcases === props.submission.totalcases) {
            setColor("text-green-500")
        } else {
            setColor("text-red-500")
        }
    }, [props.submission.passedcases, props.submission.totalcases])
    const date = new Date(props.submission.createdAt)
    return <div onClick={() => {
        props.SetCode(props.submission.code)
    }} key={props.submission.id} className="w-full border-b-2 px-5 border-zinc-900 flex justify-between items-center p-2 hover:cursor-pointer">
        <p className={`${color}`}>  {(props.submission.passedcases === props.submission.totalcases) ? "Accepted" : "Not Accepted"}</p>
        <p>{date.toLocaleDateString()}</p>
    </div>

}