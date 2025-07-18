'use client'

import { Button } from "@/components/ui/button"
import { 
    Form,
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl, 
    FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "../ui/checkbox"

export const formSchema = z.object({
  url: z.string().url({ 
    message: "Please enter a valid URL" 
  }),
  is_newsfeed: z.boolean(),
  feed_type: z.enum(["rss_to_mwfeed"]),
  item_xpath: z.string().min(5, { 
    message: "Item XPath is required" 
  }),
  title_xpath: z.string().min(1, { 
    message: "Title XPath is required" 
  }),
  description_xpath: z.string().optional(),
  date_regex: z.string().optional(),
  date_xpath: z.string().optional(),
  use_index_date: z.boolean(),
  item_url_pre_literal: z.string().optional(),
  item_url_xpath: z.string().min(4, {
    message: "Item URL Xpath is required"
  }),
  item_url_post_literal: z.string().optional(),
  source_name: z.string().min(2, { 
    message: "Source Name is required" 
  }),
  source_url: z.string().url({
    message: "Please enter a valid source URL"
  }),
  source_name_xpath: z.string().optional(),
  source_url_xpath: z.string().optional(),
  image_url_pre_literal: z.string().optional(),
  image_url_xpath: z.string().optional(),
  image_url_post_literal: z.string().optional(),
  default_image_url: z.string().url().optional(),
});

const defaultValues = {
  url: "",
  is_newsfeed: false,
  feed_type: "rss_to_mwfeed",
  item_xpath: "",
  title_xpath: "",
  description_xpath: "",
  date_regex: "",
  date_xpath: "",
  use_index_date: false,
  item_url_pre_literal: "",
  item_url_xpath: "",
  item_url_post_literal: "",
  source_name: "",
  source_url: "",
  source_name_xpath: "",
  source_url_xpath: "",
  image_url_pre_literal: "",
  image_url_xpath: "",
  image_url_post_literal: "",
  default_image_url: ""
} as const

export default function CreateFeedForm({ 
  onSubmit, 
  onReset,
}: { 
  onSubmit: (data: z.infer<typeof formSchema>) => void
  onReset?: () => void
}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
      }
    )

    const handleReset = () => {
      form.reset()
      onReset?.() // call parent's reset handler if provided
    }
  

    function handleSubmit(values: z.infer<typeof formSchema>) {
      console.log("create feed form submitted!")
      console.log(values)
      onSubmit(values)
    }
    
      return (
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)} 
            className="space-y-5"
          >
            
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the Feed URL" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_newsfeed"
              render={({ field }) => (
                <FormItem 
                  className="flex flex-row items-center gap-2"
                >
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="text-xs">
                    Is Newsfeed
                  </FormLabel>
                  <FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="item_xpath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Item Xpath</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the Item's XPATH" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title_xpath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Title Xpath</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the Title's relative XPATH" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description_xpath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Description Xpath</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the description's relative XPATH" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_xpath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Date Xpath</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the date's relative XPATH" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="use_index_date"
              render={({ field }) => (
                <FormItem 
                  className="flex flex-row items-center gap-2"
                >
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="text-xs">
                    Use Indexing Time
                  </FormLabel>
                  <FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="item_url_xpath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Item URL Xpath</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the item URL's relative XPATH" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="item_url_pre_literal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Item URL Pre-literal</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the item URL's pre-literal" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="item_url_post_literal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Item URL Post-literal</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the item URL's post-literal" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Source Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the Source Name" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Source URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the Source URL" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source_url_xpath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Source URL Xpath</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the item Source URL's relative XPATH" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source_name_xpath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Source name Xpath</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the item Source name's relative XPATH" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url_pre_literal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Image URL Pre-Literal</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the Image URL's pre-literal" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url_xpath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Image URL Xpath</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the Image URL's XPATH" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url_post_literal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Image URL Post-Literal</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the Image URL's post-literal" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="default_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Default Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the default image URL" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            
            <Button 
              className="
                bg-gradient-to-r 
                from-red-500 
                to-orange-500 
                rounded-sm
              "
              type="submit"
            >
                Preview
            </Button>

            <Button 
              className="ml-3 rounded-sm"
              onClick={handleReset}
            >
                Reset
            </Button>

          </form>
        </Form>
      )
}


