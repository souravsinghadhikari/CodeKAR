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
    username: z.string().min(6)
})

export default function SignUpForm() {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onBlur"
    })
    const MuatateSignup = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${baseurl}/users/register`, {
                email: form.getValues('email'),
                password: form.getValues('password'),
                username: form.getValues('username')
            })
            return response.data
        },
        onSettled: (data) => {
            if (data.success) {
                localStorage.setItem("token", data.data)
                toast.success("Registration successfull")
                navigate("/")
            }
            else {
                toast.error(data.message)
            }
        }
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => MuatateSignup.mutate()
            )} className="md:w-96 w-80 space-y-6 border-2 p-6 backdrop-blur-sm bg-white/10 rounded-lg border-gray-400">
                <p className="text-center text-3xl font-bold">Register</p>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="jhon doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <Button type="submit" variant={"secondary"} className="w-full">{MuatateSignup.isPending ? <AiOutlineLoading className="animate-spin text-black" /> : "Register"}</Button>
                <Link to="/login" className=" block hover:underline text-center">Already have an account! Login</Link>
            </form>
        </Form>
    )
}
