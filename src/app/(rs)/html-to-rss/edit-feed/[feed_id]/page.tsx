'use client'

import ArticlesContainer from "@/components/article/ArticlesContainer"
import EditFeedForm, { formSchema } from "@/components/html-to-rss/edit-feed/edit-feed-form"
import ConfirmEditFeedDialog from "@/components/html-to-rss/edit-feed/proceed-dialog"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { ArticlePreview } from "@/types/article"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

export type FormValues = z.infer<typeof formSchema>

export default function EditFeedPage() {
  const params = useParams()
  const feed_id = params.feed_id

    const [formData, setFormData] = useState<FormValues | null>(null)
    const [articles, setArticles] = useState<ArticlePreview[]>([])
    const [isLoading, setIsLoading] = useState(false)
    
    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
      const fetchFormValues = async () => {
        try {
          const res = await axiosPrivate.get(
            `/feed-collection-handler/get-single-feed-params/${feed_id}`
          )
          const feedData = res.data
          console.log(feedData)

          setFormData(feedData)
        } catch (err) {
          console.error("Error loading feed for editing:", err)
          toast.error("Failed to load feed data! Please try again!")
        }
      }
  
      if (feed_id) {
        fetchFormValues()
      }
    }, [feed_id])


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
                <EditFeedForm 
                    onSubmit={handleFormSubmit}
                    onReset={handleReset}
                    defaultValues={
                      formData ?? undefined
                    }
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
                    <ConfirmEditFeedDialog
                        feedID={feed_id} 
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