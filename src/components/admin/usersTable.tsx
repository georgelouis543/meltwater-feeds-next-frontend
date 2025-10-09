import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import UserRow from "./userRow"
import { UserData } from "@/types/admin/userData"
  
type Props = {
  users: UserData[],
  onDelete: (
    userId: string
  ) => void
}
  
export default function UsersTable({ 
    users,
    onDelete
 }:Props) {
    return (
      <Table className="shadow-md mt-4">
        <TableCaption className="font-bold">
            All users
        </TableCaption>
        <TableHeader className="font-bold text-l shadow-xl">
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Modified date (+0000)</TableHead>
            <TableHead>Created date (+0000)</TableHead>
            <TableHead className="text-right">
                Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow 
              key={user._id} 
              user={user}
              onDelete={onDelete} 
            />
          ))}
        </TableBody>
      </Table>
    )
}
  