import axios from "@/api/axios";
import useAuth from "./useAuth";
import { AuthData, RefreshResponse } from "@/types/auth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
  
    const refresh = async (): Promise<string> => {
      const response = await axios.get<RefreshResponse>('/auth/refresh', {
        withCredentials: true
      });
  
      setAuth((prev: AuthData) => ({
        ...prev,
        user_email: response.data.user_email,
        access_token: response.data.access_token,
        user_role: response.data.user_role,
        token_type: response.data.token_type
      }));
  
      return response.data.access_token;
    };
  
    return refresh;
};
  
export default useRefreshToken;