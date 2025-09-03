import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/app/(rs)/rss-playground/edit-feed/[feed_id]/page";
import { useState } from "react";
import EditFeedSuccessModal from "./success-modal";
import { toast } from "sonner";

type Props = {
    disabled: boolean,
    formData: FormValues | null,
    feedID: string
}

type EditFeedResponse = {
    feed_url: string,
    feed_id: string,
    success: boolean
}

export default function ConfirmEditFeedDialog({ 
    disabled,
    formData,
    feedID 
}: Props) {
    const axiosPrivate = useAxiosPrivate()

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [feedLink, setFeedLink] = useState("")
    
    const proceedToEditFeed = async () => {
        console.log("Proceed button clicked")

        if (!formData) return

        try {
            const response = await axiosPrivate.put
            (
                `/rss-playground/update-rss-to-mwfeed-converted-feed/${feedID}`, 
                formData
            )
            
            if (response.status === 204) {
                toast.info("Nothing to change!")
                return
            }

            const typedResponse = response.data as EditFeedResponse
            console.log(typedResponse)
            setFeedLink(typedResponse.feed_url || "")
            setShowSuccessModal(true)      
      
        } catch (error) {
            console.error("Error Updating feed", error)
            toast.error("Something went wrong. Please try again later.")
        }

        
    }

    return (
        <>
            <AlertDialog>

                <AlertDialogTrigger asChild>
                    <Button
                        className="p-3 mt-3 shadow-md rounded-sm"
                        disabled={disabled}
                    >
                        Proceed
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>

                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to update this feed?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will Edit the feed using the current preview.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="
                                bg-black
                                text-white
                            "
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="
                                bg-gradient-to-r 
                                from-red-500 
                                to-orange-500 
                                rounded-sm
                            "
                            onClick={proceedToEditFeed}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>

                </AlertDialogContent>

        </AlertDialog>

        <EditFeedSuccessModal
            open={showSuccessModal}
            onOpenChange={setShowSuccessModal}
            feedLink={feedLink}
        />
      </>
    )   
}