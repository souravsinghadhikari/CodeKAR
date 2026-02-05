import { useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

export default function Navbar() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    return <div className="w-full bg-neutral-950 z-20  text-white  flex justify-between items-center h-16 border-b-2 border-neutral-950 fixed top-0 left-0 px-6">
        <div onClick={() => {
            navigate("/")
        }} className="text-2xl hover:cursor-pointer font-semibold">CodeKar</div>
        <div>
            {token ? <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit">
                    <DropdownMenuItem onClick={() => {
                        navigate("/profile")
                    }} className="flex justify-center items-center hover:cursor-pointer">Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/")
                    }} className="flex bg-red-500 text-white focus:text-white hover:cursor-pointer focus:bg-red-600  justify-center items-center">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> : <Button variant={"secondary"} onClick={() => navigate("/login")}>Login</Button>}
        </div>
    </div>
}