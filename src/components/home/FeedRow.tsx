import { FeedData } from "@/types/feedData";
import { Checkbox } from "../ui/checkbox";
import { 
    TableRow, 
    TableCell 
} from "../ui/table";


type Props = {
    feed: FeedData
}

export default function FeedRow({ 
    feed 
}: Props) {
    return (
        <TableRow
            key={feed._id}
        >
            <TableCell>
                <Checkbox className="border border-gray-400" disabled />
            </TableCell>
            <TableCell>{feed._id}</TableCell>
            <TableCell>{feed.feed_type}</TableCell>
            <TableCell>{feed.created_by}</TableCell>
            <TableCell>{feed.updated_at}</TableCell>
            <TableCell>{feed.created_at}</TableCell>
            <TableCell className="text-right">
                Edit/Duplicate/Delete
            </TableCell>
        </TableRow>
    )
}