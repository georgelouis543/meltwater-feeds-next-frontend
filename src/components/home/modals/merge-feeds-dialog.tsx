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
import { Merge } from "lucide-react"

type Props = {
  onConfirmMerge: () => void
  disabled?: boolean
}

export default function MergeFeedsDialog({
  onConfirmMerge,
  disabled = false
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Merge className="w-5 h-5 text-white" />
      </DialogTrigger>

      {!disabled && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Merge Feeds</DialogTitle>
            <DialogDescription>
              Are you sure you want to merge the selected feeds? 
              This will create a new feed combining their items.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                onClick={onConfirmMerge}
              >
                Merge
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}