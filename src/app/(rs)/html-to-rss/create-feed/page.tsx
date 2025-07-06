'use client'

import ArticlesContainer from "@/components/article/ArticlesContainer"
import CreateFeedForm, { formSchema } from "@/components/html-to-rss/create-feed-form"
import ConfirmCreateFeedDialog from "@/components/html-to-rss/proceed-dialog"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { ArticlePreview } from "@/types/article"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

export type FormValues = z.infer<typeof formSchema>

export default function CreateFeedPage() {
    const [formData, setFormData] = useState<FormValues | null>(null)
    const [articles, setArticles] = useState<ArticlePreview[]>([])
    const [isLoading, setIsLoading] = useState(false)
    
    const axiosPrivate = useAxiosPrivate()

    const handleFormSubmit = async (data: FormValues) => {
        setFormData(data)
        console.log("form values lifted Up: ", data)
        setIsLoading(true)
        try {
            const response = await axiosPrivate.post(
                "/html-to-rss-convert/get-preview",
                data
            )
            const typedResponse = response.data as ArticlePreview[]
            console.log(typedResponse)
            setArticles(typedResponse) 

        } catch(error: unknown) {
            console.log("Error Fetching Preview", error)
            toast.error(
                "Something went wrong fetching the preview. Please try again later"
            )
        } finally {
            setIsLoading(false)
        }

        
    }

    const handleReset = () => {
        setArticles([])
    }

    
    return ( 
        <div className="w-full h-full flex flex-col md:flex-row">
            
            <div 
                className="
                    w-full p-4 
                    md:w-[30%] md:border-2
                    md:border-gray-[800]
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
                    onReset={handleReset}
                 /> 
            </div>

            <div className="flex flex-col w-full md:w-[70%] md:ml-7">

                <div 
                    className="
                        w-full p-4
                        md:h-[750px]
                        md:border-1 
                        md:border-gray-[800]
                        md:overflow-y-auto
                        shadow-md rounded-md
                    "
                >
                    {
                        isLoading ? (
                            // Add custom loader later
                            <p>Loading...</p> 
                        ) : (
                                <ArticlesContainer 
                                    articles={articles}
                                />
                        )
                    }
                </div>

                <div className="w-full flex md:justify-end">
                    <ConfirmCreateFeedDialog 
                        formData={formData}
                        disabled={
                            articles.length === 0
                        }
                    />
                    
                </div>

            </div>
            
 

        </div>
    )
}