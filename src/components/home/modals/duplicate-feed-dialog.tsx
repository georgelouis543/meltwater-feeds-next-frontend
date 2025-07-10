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
import { CopyPlus } from "lucide-react"

type Props = {
  feedId: string
  onConfirmDuplicate: (id: string) => void
}

export default function DuplicateeFeedDialog(
    { 
        feedId, 
        onConfirmDuplicate
    }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CopyPlus 
            className="w-4 h-4 cursor-pointer" 
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Duplicate Feed</DialogTitle>
          <DialogDescription>
            Are you sure you want to duplicate this feed? Have you checked all its existing fields?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button 
              className="
                bg-gradient-to-r 
                from-red-500 
                to-orange-500 
                text-white
              " 
              onClick={
                () => onConfirmDuplicate(feedId)
              }
            >
              Proceed
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
