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
    const [
      hasTriedRefreshing, 
      setHasTriedRefreshing
    ] = useState(false); // using this state to avoid verifyRefreshToken to run infinitely if in case refresh token is cleared
    
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
            if (isMounted) {
              setIsLoading(false);
              setHasTriedRefreshing(true)
            }
        }
      };
  
      if (!auth?.access_token && !hasTriedRefreshing) {
        verifyRefreshToken();
      } else {
        setIsLoading(false);
      }
  
      return () => {
        isMounted = false;
      };
    }, [
      auth?.access_token,
      refresh,
      hasTriedRefreshing,
      setAuth
    ]);
  
    useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
      console.log(`access token: ${JSON.stringify(auth?.access_token)}`);
    }, [isLoading, auth?.access_token]);
  
    return (
      <>
        {   
          isLoading ? <p>Loading...</p> 
          : children
        }
      </>
    );
};
  
export default PersistLogin;