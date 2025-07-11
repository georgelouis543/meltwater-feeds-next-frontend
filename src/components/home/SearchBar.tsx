"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RefreshCw, Search } from "lucide-react"
import { Input } from "../ui/input"

const FormSchema = z.object({
    filter_param: z
    .string({
      required_error: "Please select a filter parameter",
    }),
    search_value: z
    .string()
    .nonempty("Search value is required"),
})

type FormValues = z.infer<typeof FormSchema>

type Props = {
    onSearch: (data: FormValues) => void
  }

export default function SearchBar({
    onSearch 
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
   console.log(data)
   onSearch(data)
  }

  function handleReset() {
    form.reset({})
    onSearch({
        filter_param: "",
        search_value: "" 
    }) 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <div className="flex items-end">
                    <FormField
                        control={form.control}
                        name="filter_param"
                        render={({ field }) => (
                            <FormItem>
                                <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger 
                                            className="
                                                md:w-[122px]
                                                rounded-none
                                                shadow-md
                                            "
                                        >
                                            <SelectValue 
                                                placeholder="Select a filter"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="feed_id">Feed ID</SelectItem>
                                    <SelectItem value="created_by">Created by</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormItem>
                        <Input
                            type="text"
                            className="
                                md:w-[300px] 
                                rounded-none
                                shadow-md
                            "
                            placeholder="Search here..."
                            {...form.register("search_value")}
                        />
                    </FormItem>

                    <Button 
                        type="submit"
                        className="
                            rounded-none
                            md:w-[70px] 
                            shadow-md
                        "
                    >
                        <Search />
                    </Button>

                    <Button 
                        onClick={handleReset}
                        className="
                            rounded-none
                            md:w-[70px] 
                            shadow-md
                            bg-white
                            hover:bg-gradient-to-r 
                            hover:from-red-500 
                            hover:to-orange-500
                        "
                    >
                        <RefreshCw 
                            className="text-black"
                        />
                    </Button>
            </div>
      </form>
    </Form>
  )
}
