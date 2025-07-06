import { FeedData } from "@/types/feedData";
import { Checkbox } from "../ui/checkbox";
import { 
    TableRow, 
    TableCell 
} from "../ui/table";
import { CopyPlus, Pen, Trash2 } from "lucide-react";


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
                <Checkbox
                    className="border border-black" 
                    disabled 
                />
            </TableCell>
            <TableCell>{feed._id}</TableCell>
            <TableCell>{feed.feed_type}</TableCell>
            <TableCell>{feed.created_by}</TableCell>
            <TableCell>{feed.updated_at}</TableCell>
            <TableCell>{feed.created_at}</TableCell>
            <TableCell 
                className="
                    flex flex-row 
                    space-x-3 
                    justify-end 
                    p-3
                "
            >
                <Pen 
                    className="w-4 h-4" 
                />
                <CopyPlus 
                    className="w-4 h-4" 
                />
                <Trash2 
                    className="w-4 h-4" 
                />
            </TableCell>
        </TableRow>
    )
}