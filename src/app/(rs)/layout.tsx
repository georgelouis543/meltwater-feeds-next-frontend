'use client'

import { Header } from "@/components/Header"
import { ROLES } from "@/config/roles"
import PersistLogin from "@/features/auth/PersistLogin"
import RequireAuth from "@/features/auth/RequireAuth"
import useMounted from "@/hooks/useMounted"

export default function RSLayout({
    children,
}: {
    children: React.ReactNode
}) {
  const mounted = useMounted()

  if (!mounted) return null // to fix hydration mismatch

  return (
    <PersistLogin>
      <RequireAuth 
        allowedRoles={[
          ROLES.admin, 
          ROLES.user
        ]}
      >
        <div className="mx-auto w-full">
                <Header />
                <div 
                  className="
                    flex 
                    flex-col
                    md:flex-row
                    justify-between 
                    items-center 
                    w-full 
                    h-full 
                    px-2 
                    2xl:px-16
                    pt-[80px]
                    "
                >
                    {children}
                </div>
        </div>
      </RequireAuth>
    </PersistLogin>
  )
}
