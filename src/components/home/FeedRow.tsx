import { FeedData } from "@/types/feedData";
import { Checkbox } from "../ui/checkbox";
import { 
    TableRow, 
    TableCell 
} from "../ui/table";
import { Pen } from "lucide-react";
import DeleteFeedDialog from "./modals/delete-feed-dialog";
import DuplicateFeedDialog from "./modals/duplicate-feed-dialog";


type Props = {
    feed: FeedData,
    onDelete: (id: string) => void
    onDuplicate: (id: string) => void
}

export default function FeedRow({ 
    feed,
    onDelete,
    onDuplicate 
}: Props) {

    function formatDateString(dateStr: string) {
        const date = new Date(dateStr)
        const day = date.getUTCDate().toString().padStart(2, "0")
        const month = date.toLocaleString(
            "en-US", { 
                month: "short", 
                timeZone: "UTC" 
            }
        )
        const year = date.getUTCFullYear()
        const hours = date.getUTCHours().toString().padStart(2, "0")
        const minutes = date.getUTCMinutes().toString().padStart(2, "0")
        const seconds = date.getUTCSeconds().toString().padStart(2, "0")

        return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`
    }
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

            <TableCell>
                {formatDateString(feed.updated_at)}
            </TableCell>
            <TableCell>
                {formatDateString(feed.created_at)}
            </TableCell>

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
                <DuplicateFeedDialog
                    feedId={feed._id}
                    onConfirmDuplicate={onDuplicate}
                />
                <DeleteFeedDialog
                    feedId={feed._id}
                    onConfirmDelete={onDelete}
                />
            </TableCell>
        </TableRow>
    )
}