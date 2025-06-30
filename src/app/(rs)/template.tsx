'use client'

import useMounted from "@/hooks/useMounted"

export default function Template({
    children,
}: {
    children: React.ReactNode
}) {
  const mounted = useMounted()

  if (!mounted) return null
  
  return (
    <div className="w-full">
      {children}
    </div>
  )
}
