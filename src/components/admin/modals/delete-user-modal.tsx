'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type Props = {
  userId: string
  onConfirmDelete: (id: string) => void
}

export default function DeleteUserDialog(
    { 
      userId, 
      onConfirmDelete 
  }: Props) {
  return (
    <Dialog>
      <DialogTrigger 
        asChild
      >
        <Trash2 
            className="w-4 h-4 cursor-pointer" 
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button 
              variant="destructive" 
              onClick={
                () => onConfirmDelete(userId)
            }
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
