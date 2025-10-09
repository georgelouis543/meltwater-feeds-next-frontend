import { 
    TableRow, 
    TableCell 
} from "../ui/table";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/admin/userData";
import DeleteUserDialog from "./modals/delete-user-modal";


type Props = {
    user: UserData,
    onDelete: (id: string) => void
}

export default function UserRow({ 
    user,
    onDelete
}: Props) {
    const router = useRouter();

    function handleEditClick() {
        router.push(`/admin/edit-user/${user._id}`);
    }
    

    function formatDateString(dateStr: string) {
        const date = new Date(dateStr)
        const day = date.getUTCDate().toString().padStart(2, "0")
        const month = date.toLocaleString(
            "en-US", { 
                month: "short", 
                timeZone: "UTC" 
            }
        )
        const year = date.getUTCFullYear()
        const hours = date.getUTCHours().toString().padStart(2, "0")
        const minutes = date.getUTCMinutes().toString().padStart(2, "0")
        const seconds = date.getUTCSeconds().toString().padStart(2, "0")

        return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`
    }
    return (
        <TableRow
            key={user._id}
        >
            <TableCell>{user._id}</TableCell>
            <TableCell>{user.user_email}</TableCell>
            <TableCell>{user.user_name}</TableCell>
            <TableCell>{user.user_role}</TableCell>

            <TableCell>
                {formatDateString(user.updated_at)}
            </TableCell>
            <TableCell>
                {formatDateString(user.created_at)}
            </TableCell>

            <TableCell 
                className="
                    flex flex-row 
                    space-x-3 
                    justify-end 
                    p-3
                "
            >
                <Pen 
                    className="w-4 h-4 cursor-pointer" 
                    onClick={handleEditClick}
                />
        
                <DeleteUserDialog
                    userId={user._id}
                    onConfirmDelete={onDelete}
                />
            </TableCell>
        </TableRow>
    )
}