'use client'

import { Card, CardTitle } from "@/components/ui/card";
import { 
    GoogleOAuthProvider, 
    GoogleLogin, 
    CredentialResponse 
} from "@react-oauth/google";
import Image from "next/image";

export default function LoginPage() {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
    function handleLogin(credentialResponse: CredentialResponse): void {
        throw new Error("Function not implemented.");
    }

    function handleFailure(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="flex justify-center items-center w-full">
            <Card className="w-full max-w-[900px] min-w-[450px] border-0 rounded-sm sm:border-2 border-black mt-20">
                
                <div className="flex flex-col md:flex-row w-full">
                    
                    <div className="w-full md:w-[500px] flex items-center justify-center md:border-r-4 md:border-black">
                        <Image 
                            src="/images/mwfeeds-logo-login.svg" 
                            alt="Login" 
                            width='500'
                            height='200'
                        />
                    </div>
                    
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
    )
}
