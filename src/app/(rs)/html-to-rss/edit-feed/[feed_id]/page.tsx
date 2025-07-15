'use client'

import { useParams } from "next/navigation"

export default function EditFeedPage() {
  const params = useParams()
  const feedId = params.feed_id 

  return (
    <div>
      <h1>Edit Feed</h1>
      <p>Editing feed with ID: {feedId}</p>
    </div>
  )
}