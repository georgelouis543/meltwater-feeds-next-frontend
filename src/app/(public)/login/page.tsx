'use client'

import axios from "@/api/axios";
import { Card, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { 
    GoogleOAuthProvider, 
    GoogleLogin, 
    CredentialResponse 
} from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface LoginResponse {
    access_token: string;
    user_email: string;
    user_role: string;
    token_type: string;
}

export default function LoginPage() {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
    const LOGIN_URL = '/auth/login';
    
    const errRef = useRef<HTMLParagraphElement>(null);
    const [errMsg, setErrMsg] = useState('')
    
    const router = useRouter()
    const { setAuth } = useAuth();
    
    const [isLoading, setIsLoading] = useState(false)
  
    async function handleLogin(googleData: CredentialResponse): Promise<void> {
        setIsLoading(true)
        
        if (!googleData.credential) {
            console.error("No credential received from Google");
            setErrMsg("No credential received from Google")
            errRef.current?.focus()
            return
        }
  
        try {
            const result = await axios.get<LoginResponse>(
                LOGIN_URL, {
                params: {
                token: googleData.credential
                },
                withCredentials: true,
            }
            ) 
            const { 
                access_token,
                user_email,
                user_role,
                token_type
            } = result.data

            console.log("Access Token:", access_token)
            setAuth({
                access_token, 
                user_email,
                user_role,
                token_type
            })
            router.push("/home")
        } catch (error: unknown) {
            console.error("Login failed:", error);
            
            if (typeof error === "object" && error !== null && "status" in error) {
                const err = error as { 
                    status?: number; 
                    data?: { 
                        detail?: string 
                    } 
                };
            
                if (!err.status) {
                setErrMsg("No server response");
                } else if (err.status === 401) {
                setErrMsg("Unauthorized");
                } else if (err.status === 403) {
                setErrMsg("Only Meltwater users can access this app");
                } else {
                setErrMsg(err.data?.detail || "Login failed");
                }
            } else {
                setErrMsg("An unknown error occurred");
            }
            
            errRef.current?.focus();
        } finally {
            setIsLoading(false)
        }
      
    }
  
    function handleFailure(): void {
      setErrMsg("Google login was cancelled or failed")
      errRef.current?.focus()
    }
  
    const errClass = errMsg ? "text-red-600 text-[15px] mb-4 mt-5 font-bold" : "sr-only"
  
    // Add custom loading animation later
    if (isLoading) return <p className="text-center mt-10">Loading...</p> 

    return (
        <div className="flex flex-col text-center">
            <div className="flex justify-center items-center w-full">
                <Card className="w-full max-w-[900px] min-w-[450px] border-0 rounded-sm sm:border-2 border-black mt-20 bg-gradient-to-r from-red-500 to-orange-500">
                    
                    <div className="flex flex-col md:flex-row w-full">
                        
                        {/* Image goes left */}
                        <div className="w-full md:w-[500px] flex items-center justify-center md:border-r-4 md:border-black">
                            <Image 
                                src="/images/mwfeeds-logo-login.svg" 
                                alt="Login" 
                                width='500'
                                height='200'
                                className=""
                            />
                        </div>

                        {/* Google SSO Button to the Right*/}
                        <div className="w-full md:w-[400px] flex flex-col items-top justify-center p-4">
                            <CardTitle className="text-xl text-center md:border-b-2 md:border-black pb-2">
                                Continue with your meltwater account
                            </CardTitle>
                            
                            <div className="mt-5 flex justify-center">
                                <GoogleOAuthProvider clientId={CLIENT_ID}>
                                    <GoogleLogin
                                    onSuccess={handleLogin}
                                    onError={handleFailure} 
                                    theme="filled_black" 
                                    shape="rectangular"
                                    width="300"
                                    size="large"
                                    ux_mode="popup"  
                                    text = "continue_with"               
                                    />            
                                </GoogleOAuthProvider> 
                            </div>
                        
                        </div>

                    </div>

                </Card>  

            </div>

            {/* Display Login Error messages */}
            <p ref={errRef} className={errClass} aria-live="assertive">
                {errMsg}
            </p>
        </div>
    )
}
