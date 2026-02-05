import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ProtectLogin({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            navigate("/questions")
        }
    }, [token])
    return <>{children}</>
}