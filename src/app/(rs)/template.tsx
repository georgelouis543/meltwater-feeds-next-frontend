'use client'

export default function Template({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <div 
      className="w-full"
    >
      {children}
    </div>
  )
}
