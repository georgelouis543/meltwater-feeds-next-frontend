'use client'

import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const RequireAuth = ({ 
    children 
}: { 
    children: React.ReactNode
}) => {
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
  
    return (
        <>
            {children}
        </>
    )
};
  
export default RequireAuth;