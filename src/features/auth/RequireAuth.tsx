'use client'

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

type RequireAuthProps = {
  allowedRoles: string[]
  children: ReactNode
}

const RequireAuth = ({
    allowedRoles, 
    children 
}: RequireAuthProps) => {
    const { auth } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
      if (!auth?.access_token || !auth?.user_email) {
        router.replace(`/login?from=${pathname}`);
      }
    }, [auth, pathname, router]);
  
    if (!auth?.access_token || !auth?.user_email) {
      return null; // Prevent rendering while redirecting
    }
  
    return auth.user_role && allowedRoles.includes(auth.user_role) ? (
        <>
          {children}
        </>
    ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen text-center px-2">
            <h2 className="text-3xl font-bold mb-4 text-black">
                Uh-oh! 🚫 You&apos;re not supposed to be here
            </h2>
            <Link
                href="/login"
                className="underline text-red-600"
            >
                Try logging in with the right account.
            </Link>
        </div>
    )
};
  
export default RequireAuth;