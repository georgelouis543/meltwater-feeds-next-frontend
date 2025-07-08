'use client'

import FeedsTable from "@/components/home/FeedsTable";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { FeedData } from "@/types/feedData";
import { useEffect, useState } from "react";
import FeedsPagination from "@/components/home/FeedsPagination";
import SearchBar from "@/components/home/SearchBar";

  
export default function HomePage() {
    const [feeds, setFeeds] = useState<FeedData[]>([])

    // Pagination-related states
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // Search-bar related states
    const [filterParam, setFilterParam] = useState("")
    const [searchValue, setSearchValue] = useState("")

    const [isLoading, setIsLoading] = useState(true)

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchFeeds = async () => {
          try {
            const query_params = new URLSearchParams({
              page: (page + 1).toString(),
              size: "15"
            })

            if (filterParam && searchValue) {
              query_params.append(filterParam, searchValue)
            }

            const res = await axiosPrivate.get(
                `/feed-collection-handler/get-all-feeds?${query_params.toString()}`
            ) 

            setFeeds(res.data.feeds)
            setTotalPages(res.data.pages)
            console.log(res.data)
            
          } catch (err) {
            console.log(err)
          } finally {
            setIsLoading(false)
          }
        }
    
        fetchFeeds()
      }, [
        page, 
        axiosPrivate, 
        filterParam, 
        searchValue
      ]
    )

    const handleSearch = (
      data: { 
        filter_param: string; 
        search_value: string 
      }) => {
      setPage(0) 
      setFilterParam(data.filter_param)
      setSearchValue(data.search_value)
    }

    return (
      isLoading ? <p>Loading...</p>
      :
        (<>
            <SearchBar 
              onSearch={handleSearch} 
            />
            <FeedsTable 
              feeds={feeds} 
            />
            <FeedsPagination 
              pageCount={totalPages} 
              currentPage={page} 
              onPageChange={setPage}
            />
        </>)
    )
  }
  