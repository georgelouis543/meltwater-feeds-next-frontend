'use client'

import ReactPaginate from "react-paginate"

type Props = {
  pageCount: number
  currentPage: number
  onPageChange: (selectedPage: number) => void
}

export default function UsersPagination({ 
  pageCount, 
  currentPage, 
  onPageChange 
}: Props) {
  return (
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={
        ({ selected }) => onPageChange(selected)
      }
      forcePage={currentPage}
    
      containerClassName="flex items-center gap-2 mt-6"
      activeClassName="font-bold text-white bg-black"
    
      pageClassName="border rounded"
      pageLinkClassName="block px-3 py-1 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white"
    
      previousClassName="border rounded"
      previousLinkClassName="block px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white"
    
      nextClassName="border rounded"
      nextLinkClassName="block px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white"
    
      breakClassName="border rounded"
      breakLinkClassName="block px-3 py-1"
    />
  )
}
