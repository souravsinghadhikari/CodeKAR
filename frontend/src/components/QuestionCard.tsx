import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "./ui/badge"

export default function QuestionCard(props: {
    question: string,
    id: string,
    num: number,
    difficulty: string,
    description: string
}) {
    const navigate = useNavigate()

    const [difficulty, setDifficulty] = useState("text-red-500")
    useEffect(() => {
        if (props.difficulty === "easy") {
            setDifficulty("bg-green-500")
        } else if (props.difficulty === "medium") {
            setDifficulty("bg-yellow-500")
        } else {
            setDifficulty("bg-red-500")
        }
    }
        , [props.difficulty])
    return <div onClick={() => {
        navigate(`/questions/${props.id}`)
    }} className={`border-2 border-zinc-800 bg-neutral-950 h-24 shadow-md relative rounded-lg flex flex-col justify-around  items-start hover:cursor-pointer w-5/6 p-5 `} >
        <div className="flex justify-start items-center ">
            <p className="text-xl font-semibold">{props.num}</p>
            <p className="text-xl font-semibold">. {props.question}</p>
        </div>
        <p className="text-gray-300 truncate text-ellipsis w-full">{props.description}.</p>
        <Badge className={`absolute top-5 right-5  ${difficulty} `}>{props.difficulty}</Badge>
    </div>
}