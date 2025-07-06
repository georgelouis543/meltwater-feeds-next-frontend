import { ArticlePreview } from "@/types/article";

type Props = {
    articles?: ArticlePreview[]
  }

export default function ArticlesContainer({ 
    articles = []
 }: Props) {

    return (
        <div className="w-full space-y-5">
            {
                articles.length === 0 ? (
                    <p>No articles to preview.</p>
                ) : (
                    articles.map((article, index) => (
                        <div 
                            key={index} 
                            className="
                                w-full 
                                rounded-sm shadow-sm
                                border 
                                flex md:flex-row flex-col 
                                p-3
                            "
                        >

                            <div className="md:w-[20%] w-full md:flex md:items-top">
                                <img
                                    src={article.image_url}
                                    alt={"image url"}  
                                    className="
                                        md:pl-3 md:pt-1 
                                        w-full 
                                        md:h-[120px] md:w-[80%]
                                    "                               
                                />
                            </div>
                           

                            <div 
                                className="
                                    md:w-[80%] 
                                    w-full 
                                    space-y-3 
                                    md:flex md:flex-col 
                                    md:items-top
                                "
                            >

                                <p className="text-black font-bold">
                                    { 
                                        article.title.trim() != "" 
                                        ? article.title 
                                        : "No title available" 
                                    }
                                </p>

                                <p className="text-gray-800 text-sm">
                                    { 
                                        article.item_url.trim() != "" 
                                        ? article.item_url 
                                        : "No URL available" 
                                    }
                                </p>

                                <p className="text-gray-500 text-sm text-justify">
                                    { 
                                        article.description.trim() != "" 
                                        ? article.description 
                                        : "No description available" 
                                    }
                                </p>
                   
                                <p className="text-gray-800 text-sm font-bold">
                                    { 
                                        article.published_date.trim() != "" 
                                        ? article.published_date
                                        : "No Date available" 
                                    }
                                </p>

                            </div>

                        </div>
                    ))
                )
            }
        </div>
    )
}