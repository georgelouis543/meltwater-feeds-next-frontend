'use client'

import { Header } from "@/components/Header"
import useMounted from "@/hooks/useMounted"

export default function RSLayout({
    children,
}: {
    children: React.ReactNode
}) {
  const mounted = useMounted()

  if (!mounted) return null // to fix hydration mismatch

  return (
    <div className="mx-auto w-full">
            <Header />
            <div className="px-4 py-2">
                {children}
            </div>
    </div>
  )
}
