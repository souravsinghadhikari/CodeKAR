import LoginForm from "@/components/forms/login_form";

export default function Login() {
    return <div className="w-full h-screen bg-black text-white flex  justify-center items-center">

        <div className="w-1/2 h-screen hidden lg:flex justify-center items-center">
            <img className="object-cover h-full" src="https://img.freepik.com/premium-photo/student-doing-coding-his-computer-setup_939033-14111.jpg"></img>
        </div>
        <div className="lg:w-1/2 w-full h-screen bg-neutral-900  flex justify-center items-center">
            <LoginForm />
        </div>

    </div>
}