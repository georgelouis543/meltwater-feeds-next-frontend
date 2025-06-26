'use client'

import useAuth from "@/hooks/useAuth";
import useRefreshToken from "@/hooks/useRefreshTokens";
import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
  };
  
const PersistLogin = ({ 
    children 
}: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
  
    useEffect(() => {
      let isMounted = true;
  
      const verifyRefreshToken = async () => {
        try {
            await refresh();
        } catch (err) {
            setAuth({})
            console.error(err);
        } finally {
            if (isMounted) setIsLoading(false);
        }
      };
  
      if (!auth?.access_token) {
        verifyRefreshToken();
      } else {
        setIsLoading(false);
      }
  
      return () => {
        isMounted = false;
      };
    }, []);
  
    useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
      console.log(`aT: ${JSON.stringify(auth?.access_token)}`);
    }, [isLoading]);
  
    return (
      <>
        {   isLoading ? <p>Loading...</p> 
            : children
        }
      </>
    );
};
  
export default PersistLogin;