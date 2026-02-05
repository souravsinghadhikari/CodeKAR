import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import SubmissionCard from "./SubmissionCard"
import { baseurl } from "@/utils/common"

export default function Submissions(props: {
    id: string,
    SetCode: any
}) {
    const QuerySubmissions = useQuery({
        queryKey: ['submissions', props.id],
        queryFn: async () => {
            const response = await axios.get(`${baseurl}/submissions/submission/?id=${props.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        }
    })
    if (QuerySubmissions.isLoading) {
        return <div className="w-full h-full flex-col text-white flex justify-center items-center">
            Loading...
        </div>
    }
    if (QuerySubmissions.isError) {
        return <div className="w-full h-full flex-col text-white flex justify-center items-center">
            Error...
        </div>
    }
    if (QuerySubmissions.data.data.length == 0) {
        return <div className="w-full h-full flex-col flex text-white justify-center items-center">
            No submissions yet
        </div>
    }
    return <div className="w-full h-full flex-col text-white flex justify-start   items-center overflow-y-auto ">
        {QuerySubmissions.data.data.map((submission: any) => {
            return <SubmissionCard key={submission.id} SetCode={props.SetCode} submission={submission} />
        })}
    </div>
}