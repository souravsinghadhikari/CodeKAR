import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { baseurl } from "@/utils/common"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export default function Profile() {
    const QueryProfile = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await axios.get(`${baseurl}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    console.log("Current State:", { 
        isLoading: QueryProfile.isLoading, 
        isError: QueryProfile.isError, 
        data: QueryProfile.data,
        error: QueryProfile.error // <--- This holds the reason for the failure
    });
    if (QueryProfile.isLoading) {
        return <div className="h-screen w-full bg-black flex text-white justify-center items-center">
            Loading...
        </div>
    }
    if (QueryProfile.isError) {
        return <div className="h-screen w-full text-white bg-black flex justify-center items-center">
            Error...
        </div>
    }
    if (QueryProfile.data) {
        console.log(QueryProfile.data);
        return <div className="w-full min-h-screen bg-neutral-900 text-white  flex-col flex justify-center items-center pt-16 lg:pt-24 lg:pb-10">
            <div className="h-fit lg:w-2/3 xl:w-1/2 w-full rounded-lg space-y-3   bg-neutral-950 p-10">
                <div className="flex justify-start items-center">
                    <Avatar >
                        <AvatarImage className="rounded-full h-16 w-16" src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="pl-5 flex flex-col justify-around items-start h-16">
                        <p className="font-semibold text-xl">{QueryProfile.data.data.profile.username}</p>
                        <p className="text-gray-300">{QueryProfile.data.data.profile.email}</p>
                    </div>
                </div>
                <p className="text-2xl font-semibold pt-5">Statistics</p>
                <div className="flex justify-between items-center">
                    <div className="w-1/2">
                        <p className="text-gray-300">Submissions</p>
                        <p className="text-2xl font-semibold">{QueryProfile.data.data.submissions}</p>
                    </div>
                    <div className="w-1/2">
                        <p className="text-gray-300">Problems Solved</p>
                        <p className="text-2xl font-semibold">{QueryProfile.data.data.correct}</p>
                    </div>
                </div>
                <div>
                    <p className="text-2xl font-semibold">Accuracy</p>
                    <p className="text-gray-300 text-sm font-medium">{QueryProfile.data.data.correctsubmissions} out of {QueryProfile.data.data.submissions} submissions successful</p>
                    <Progress className="w-full mt-2 h-5" value={(QueryProfile.data.data.correctsubmissions / QueryProfile.data.data.submissions) * 100} />
                </div>
                <CalendarHeatmap classForValue={(value) => {
                    if (!value) {
                        return '#fff';
                    }
                    return `color-github-${value.count}`;
                }} endDate={Date.now()} startDate={new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000)} values={QueryProfile.data.data.values} ></CalendarHeatmap>
                <p className="text-xl font-semibold pt-5">Recent Activity</p>
                {QueryProfile.data.data.recent.map((question: any) => {
                    return <div className="flex justify-between items-center my-2 bg-neutral-800 rounded-sm  p-2">
                        <p>{question.question.question}</p>
                        {question.correct ? <Badge className="bg-green-500">Passed</Badge> : <Badge>Failed</Badge>}
                    </div>
                })}

            </div>
        </div>
    }

}