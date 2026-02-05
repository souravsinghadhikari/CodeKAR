import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import QuestionCard from "../components/QuestionCard"
import { baseurl } from "@/utils/common"

export default function Question() {
    const queryQuestions = useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            const resposne = await axios.get(`${baseurl}/questions/question`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            return resposne.data
        }
    })
    if (queryQuestions.isLoading) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Loading...</div>
    }
    if (queryQuestions.isError) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Error</div>
    }
    if (queryQuestions.data) {
        return <div className="w-full min-h-screen space-y-2 bg-neutral-900 text-white flex-col flex justify-start  pt-20 items-center pb-10">
            {/* <QuestionCard difficulty="difficulty" num={0} id={""} question={"questions"} /> */}
            {queryQuestions.data.data.map((question: any, index: number) => {
                return <QuestionCard description={question.description} difficulty={question.difficulty} num={index + 1} id={question.id} key={question.id} question={question.question} />
            })}
        </div>
    }

}