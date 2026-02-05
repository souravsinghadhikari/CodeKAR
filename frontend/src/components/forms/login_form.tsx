

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { AiOutlineLoading } from "react-icons/ai"
import { baseurl } from "@/utils/common"

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default function LoginForm() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onBlur"
    })
    const navigate = useNavigate()
    const MuatateLogin = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${baseurl}/users/login`, {
                email: form.getValues("email"),
                password: form.getValues("password")
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data
        },
        onSettled: (data) => {
            if (data.success) {
                console.log(data.token); 
                localStorage.setItem("token", data.token); 
                toast.success("Login Success");
                navigate("/");
            }
            else {
                toast.error(data.message)
            }
        }
    })



    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(() => MuatateLogin.mutate())} className="md:w-96 w-80 space-y-6 border-2  p-6 backdrop-blur-sm bg-white/10 rounded-lg border-gray-400">
                <p className="text-center text-3xl font-bold">Login</p>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jhondoe@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="not sure" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={"secondary"} type="submit" className="w-full">{MuatateLogin.isPending ? <AiOutlineLoading className="animate-spin text-black" /> : "login"}</Button>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-800" onClick={() => {
                    form.setValue("email", "guest@gmail.com")
                    form.setValue("password", "guest123")
                }}>{MuatateLogin.isPending ? <AiOutlineLoading className="animate-spin text-black" /> : "Guest login"}</Button>
                <Link to="/register" className=" block hover:underline text-center">Dont have an account! Register</Link>
            </form>
        </Form>
    )
}
