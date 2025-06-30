'use client'

import CreateFeedForm, { formSchema } from "@/components/html-to-rss/create-feed-form"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useState } from "react"
import { z } from "zod"

type FormValues = z.infer<typeof formSchema>

export default function CreateFeedPage() {
    const [formData, setFormData] = useState<FormValues | null>(null)
    const axiosPrivate = useAxiosPrivate()

    const handleFormSubmit = async (data: FormValues) => {
        setFormData(data)
        console.log("form values lifted Up: ", data)

        const response = await axiosPrivate.post(
            "/html-to-rss-convert/get-preview",
            data
        )
        console.log(response)
      }

    
    return ( 
        <div className="w-full h-full flex flex-col md:flex-row">
            
            <div 
                className="
                    w-full p-4 
                    md:w-[30%] md:border-1
                    md:border-black
                    md:shadow-sm
                    md:rounded-sm 
                    md:h-[800px]
                    md:overflow-y-auto
                    shadow-md rounded-md
                    border-1 border-gray-[700]
                "
            >
                <CreateFeedForm 
                    onSubmit={handleFormSubmit}
                 /> 
            </div>
            
            <div className="w-full md:w-[70%] md:ml-30 md:h-auto">
                Articles preview
            </div>

        </div>
    )
}