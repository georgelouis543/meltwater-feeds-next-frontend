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
  feedId: string | number
  onConfirmDuplicate: (id: string | number) => void
  disabled?: boolean
}

export default function DuplicateeFeedDialog(
    { 
        feedId, 
        onConfirmDuplicate,
        disabled = false
    }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CopyPlus 
            className={`w-4 h-4 transition 
            ${disabled 
              ? "opacity-40 cursor-not-allowed pointer-events-none" 
              : "cursor-pointer hover:text-red-600"}`
            } 
        />
      </DialogTrigger>

      {!disabled && (
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
      )}
      
    </Dialog>
  )
}
