import { axiosPrivate } from "@/api/axios";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshTokens";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    sent?: boolean;
  }
  
const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
  
    useEffect(() => {
      const requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  
      const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config as CustomAxiosRequestConfig;
  
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();

            // Making sure Headers exist to avoid undefined TS Error
            if (!prevRequest.headers) {
                prevRequest.headers = {};
              }

            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
  
          return Promise.reject(error);
        }
      );
  
      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      };
    }, [auth, refresh]);
  
    return axiosPrivate;
};
  
export default useAxiosPrivate;