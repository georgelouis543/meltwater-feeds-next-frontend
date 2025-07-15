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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { FormValues } from "@/app/(rs)/html-to-rss/create-feed/page";
import { useState } from "react";
import CreateFeedSuccessModal from "./success-modal";
import { toast } from "sonner";

type Props = {
    disabled: boolean,
    formData: FormValues | null
}

type CreateFeedResponse = {
    feed_url: string,
    feed_id: string,
    success: boolean
}

export default function ConfirmCreateFeedDialog({ 
    disabled,
    formData 
}: Props) {
    const axiosPrivate = useAxiosPrivate()

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [feedLink, setFeedLink] = useState("")
    
    const proceedToCreateFeed = async () => {
        console.log("Proceed button clicked")

        if (!formData) return

        try {
            const response = await axiosPrivate.post
            (
                "/rss-playground/save-feed", 
                formData
            )
            const typedResponse = response.data as CreateFeedResponse
            console.log(typedResponse)
            setFeedLink(typedResponse.feed_url || "")
            setShowSuccessModal(true)      
      
        } catch (error) {
            console.error("Error creating feed", error)
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
                            Are you sure you want to create this feed?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will create the feed using the current preview.
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
                            onClick={proceedToCreateFeed}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>

                </AlertDialogContent>

        </AlertDialog>

        <CreateFeedSuccessModal
            open={showSuccessModal}
            onOpenChange={setShowSuccessModal}
            feedLink={feedLink}
         />
      </>
    )   
}