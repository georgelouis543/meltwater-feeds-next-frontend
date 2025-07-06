import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import FeedRow from "./FeedRow"
import { FeedData } from "@/types/feedData"
  
 
  
export default function FeedsTable({ 
    feeds
 }: {
    feeds: FeedData[]
}) {
    return (
      <Table className="shadow-md">
        <TableCaption className="font-bold">
            List of all feeds
        </TableCaption>
        <TableHeader className="font-bold text-l shadow-xl">
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Feed ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created by</TableHead>
            <TableHead>Modified date</TableHead>
            <TableHead>Created date</TableHead>
            <TableHead className="text-right">
                Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeds.map((feed) => (
            <FeedRow key={feed._id} feed={feed} />
          ))}
        </TableBody>
      </Table>
    )
}
  