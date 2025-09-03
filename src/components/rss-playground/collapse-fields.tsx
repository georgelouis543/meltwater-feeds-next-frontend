import { 
    Collapsible, 
    CollapsibleContent, 
    CollapsibleTrigger
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from "lucide-react"
import { ReactNode } from "react"

interface CollapseProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function Collapse(
    { 
        title, 
        children,
        defaultOpen = false
    }: CollapseProps) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger asChild>
        <div 
          className="
            text-sm font-bold 
            flex items-center justify-between 
            gap-2 p-2
            border-black border rounded-sm cursor-pointer
          "
        >
          {title}
          <ChevronsUpDownIcon size={18} />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3 space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
