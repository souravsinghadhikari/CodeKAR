import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function UserRouteProctection({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [token])
    return <>{children}</>
}