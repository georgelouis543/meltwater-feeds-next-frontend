import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL
})

export default axiosInstance;

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});