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
  feedId: string
  onConfirmDelete: (id: string) => void
}

export default function DeleteFeedDialog(
    { 
      feedId, 
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
          <DialogTitle>Delete Feed</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this feed? This action cannot be undone.
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
                () => onConfirmDelete(feedId)
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
