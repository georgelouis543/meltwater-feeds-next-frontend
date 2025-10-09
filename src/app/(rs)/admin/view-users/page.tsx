'use client'

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { 
  useCallback, 
  useEffect, 
  useState 
} from "react";
import SearchBar from "@/components/admin/SearchBar";
import { toast } from "sonner";
import UsersTable from "@/components/admin/usersTable";
import { UserData } from "@/types/admin/userData";
import UsersPagination from "@/components/admin/usersPagination";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

  
export default function ViewUsersPage() {
    const router = useRouter()
    const [users, setUsers] = useState<UserData[]>([])

    // Pagination-related states
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // Search-bar related states
    const [filterParam, setFilterParam] = useState("")
    const [searchValue, setSearchValue] = useState("")

    const [isLoading, setIsLoading] = useState(true)

    const axiosPrivate = useAxiosPrivate()

    const fetchUsers = useCallback(async () => {
      try {
        const query_params = new URLSearchParams({
          page: (page + 1).toString(),
          size: "10"
        })
    
        if (filterParam && searchValue) {
          query_params.append(filterParam, searchValue)
        }
    
        const res = await axiosPrivate.get(
          `/admin/get-all-users?${query_params.toString()}`
        )
    
        setUsers(res.data.users)
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
        fetchUsers()
      }, [fetchUsers]
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

    // handling Delete 
    const handleDeleteUser = async (
      userId: string
      ) => {
        try {
          await axiosPrivate
          .delete(`/admin/delete-user/${userId}`)
          toast.success("User has been deleted!")
          fetchUsers()
        } catch (err) {
          console.error("Error deleting user", err)
          toast.error("Error Deleting user! See console for more details.")
        }
      }


    return (
      isLoading ? <p>Loading...</p>
      :
        (<>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
                <SearchBar 
                onSearch={handleSearch} 
                />
                <Button 
                    onClick={() => router.push('/admin/add-user')}
                    className="
                        w-[150px] 
                        rounded-none 
                        bg-white border border-gray-300 
                        text-black shadow-md 
                        hover:bg-gray-100
                    "
                >
                    <UserPlus />
                    Add New User
                </Button>
            </div>
            
            <UsersTable 
              users={users} 
              onDelete={handleDeleteUser}
            />
            <UsersPagination 
              pageCount={totalPages} 
              currentPage={page} 
              onPageChange={setPage}
            />
        </>)
    )
  }
  