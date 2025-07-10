'use client'

import ReactPaginate from "react-paginate"

type Props = {
  pageCount: number
  currentPage: number
  onPageChange: (selectedPage: number) => void
}

export default function FeedsPagination({ 
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
      containerClassName={"flex items-center gap-2 mt-6"}
      activeClassName={"font-bold text-white bg-black"}
      pageClassName={
        "px-3 py-1 border rounded hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white"
      }
      previousClassName={
        "px-3 py-1 border rounded bg-gradient-to-r from-red-500 to-orange-500 text-white"
      }
      nextClassName={
        "px-3 py-1 border rounded bg-gradient-to-r from-red-500 to-orange-500 text-white"
      }
      breakClassName={"px-3 py-1"}
      forcePage={currentPage}
    />
  )
}
