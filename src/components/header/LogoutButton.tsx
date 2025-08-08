import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
    const axiosPrivate = useAxiosPrivate()
    const { setAuth } = useAuth()
    
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const response = await axiosPrivate.get("/auth/logout")
            console.log(response.data)
            setAuth({})
            router.push("/login")
            toast.success("You were successfully Logged Out!")
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong!")
        }
    }


    return (
        <LogOut 
            size={20} 
            onClick={handleLogout}
            className="cursor-pointer"
        >
            <title>
                Logout
            </title>
        </LogOut>
    )
        
}