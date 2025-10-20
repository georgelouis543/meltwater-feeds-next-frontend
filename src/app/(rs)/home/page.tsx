'use client'

import FeedsTable from "@/components/home/FeedsTable";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { FeedData } from "@/types/feedData";
import { 
  useCallback, 
  useEffect, 
  useState 
} from "react";
import FeedsPagination from "@/components/home/FeedsPagination";
import SearchBar from "@/components/home/SearchBar";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import MergeFeedsDialog from "@/components/home/modals/merge-feeds-dialog";

  
export default function HomePage() {
    const { auth } = useAuth()
    console.log(auth.user_email)

    const [feeds, setFeeds] = useState<FeedData[]>([])

    // Pagination-related states
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // Search-bar related states
    const [filterParam, setFilterParam] = useState("")
    const [searchValue, setSearchValue] = useState("")

    // Merge related states
    const [
      selectedFeedIds, 
      setSelectedFeedIds
    ] = useState<(string | number)[]>([]);

    const [isLoading, setIsLoading] = useState(true)

    const axiosPrivate = useAxiosPrivate()

    const fetchFeeds = useCallback(async () => {
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
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }, [
      page, 
      filterParam, 
      searchValue, 
      axiosPrivate
    ])

    useEffect(() => {
        fetchFeeds()
      }, [fetchFeeds]
    )

    // handling search
    const handleSearch = (
      data: { 
        filter_param: string; 
        search_value: string 
      }) => {
      setPage(0) 
      setFilterParam(data.filter_param)
      setSearchValue(data.search_value)
    }

    // handling selected inputs
    function handleSelectFeed(
      feedId: string | number, 
      checked: boolean
      ) {
      setSelectedFeedIds(prev => {
        if (checked) return [...prev, feedId];
        return prev.filter(id => id !== feedId);
      });
    }

    // Tracking changes to the selectedIds array
    useEffect(() => {
      console.log("Selected feed IDs:", selectedFeedIds);
    }, [selectedFeedIds]);

    // handling merge
    async function handleMergeFeeds() {
      console.log("Merging feeds:", selectedFeedIds);
      try {
        const res = await axiosPrivate.post(
          "/feed-collection-handler/merge-feeds",
          {
            feed_ids: selectedFeedIds,
            feed_type: "merged_feed"
          }
        );
    
        console.log(res.data)
        toast.success(res.data.message);
        setSelectedFeedIds([]);
        fetchFeeds();
      } catch (err) {
        console.error("Error merging feeds", err);
        toast.error("Error merging feeds! Check console for more info.");
      }
    }

    // handling Delete 
    const handleDeleteFeed = async (
      feedId: string | number
      ) => {
        try {
          await axiosPrivate
          .delete(`/feed-collection-handler/delete-feed/${feedId}`)
          toast.success("Feed has been deleted!")
          fetchFeeds()
        } catch (err) {
          console.error("Error deleting feed", err)
          toast.error("Error Deleting feed! See console for more details.")
        }
      }

      // handling Duplicate 
      const handleDuplicateFeed = async (
        feedId: string | number
        ) => {
          try {
            const res = await axiosPrivate
            .get(`/feed-collection-handler/duplicate-feed?feed_id=${feedId}`)
            
            toast.success(res.data.message)
            fetchFeeds()
          } catch (err) {
            console.error("Error duplicating feed", err)
            toast.error("Error duplicating feed! See console for more details.")
          }
        }

    return (
      isLoading ? <p>Loading...</p>
      :
        (<>
            <div 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <SearchBar 
                onSearch={handleSearch} 
              />
              <div className="border border-black p-2 shadow-md hover:bg-gray-700 bg-black transition-colors cursor-pointer mt-2 sm:mt-0 sm:ml-4 self-start sm:self-auto">
                <MergeFeedsDialog 
                  onConfirmMerge={handleMergeFeeds}
                  disabled={selectedFeedIds.length < 2}
                />
              </div>
            </div>
            
            <FeedsTable 
              feeds={feeds} 
              user_email={auth.user_email!}
              onDelete={handleDeleteFeed}
              onDuplicate={handleDuplicateFeed}
              onSelectFeed={handleSelectFeed}
              selectedFeedIds={selectedFeedIds}
            />
            <FeedsPagination 
              pageCount={totalPages} 
              currentPage={page} 
              onPageChange={setPage}
            />
        </>)
    )
  }
  