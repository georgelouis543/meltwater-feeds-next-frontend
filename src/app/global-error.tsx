'use client'
import { Button } from "@/components/ui/button"

 // Error boundaries must be Client Components
 
export default function GlobalError({
  // error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="flex flex-col items-center justify-center w-full h-screen text-center px-2">
          <h2 className="text-3xl font-bold mb-4">
            Something Went Wrong.
          </h2>
        </div>
        <Button onClick={() => reset()}>
          Please Try again.
        </Button>
      </body>
    </html>
  )
}