import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    feedLink: string
}

export default function EditFeedSuccessModal({ 
    open, 
    onOpenChange, 
    feedLink 
}: Props) {
    const router = useRouter()

    function goBackHome(): void {
        onOpenChange(false)
        router.push("/home")
        
    }

    return (
        <Dialog 
            open={open} 
            onOpenChange={onOpenChange}
        >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feed Updated Successfully</DialogTitle>
            <DialogDescription className="mt-2">
              Your feed has been Updated. Here is the link:
            </DialogDescription>
            <p className="bg-gray-100 p-2 mt-1 rounded text-[11px] break-all">
                {
                    feedLink || "No feed link found"
                }
            </p>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button 
                    type="button"
                    onClick={goBackHome}
                >
                    Home
                </Button>
            </DialogClose>
          </DialogFooter>
        
        </DialogContent>
      </Dialog>
    )
}