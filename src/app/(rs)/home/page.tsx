'use client'

import FeedsTable from "@/components/home/FeedsTable";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationPrevious, 
  PaginationLink, 
  PaginationEllipsis, 
  PaginationNext 
} from "@/components/ui/pagination";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { FeedData } from "@/types/feedData";
import { useEffect, useState } from "react";

  
export default function HomePage() {
    const [feeds, setFeeds] = useState<FeedData[]>([])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(true)

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchFeeds = async () => {
          try {
            const res = await axiosPrivate.get(
                "/feed-collection-handler/get-all-feeds"
            ) 
            setFeeds(res.data)
            console.log(res.data)
          } catch (err) {
            console.log(err)
          } finally {
            setIsLoading(false)
          }
        }
    
        fetchFeeds()
      }, [])

    return (
        <>
            <FeedsTable feeds={feeds} />

            <Pagination className="mt-5">
              <PaginationContent>

                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
                
              </PaginationContent>
            </Pagination>
        </>
    )
  }
  