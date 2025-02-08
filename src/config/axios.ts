import axios, { AxiosInstance } from "axios";

console.log(import.meta.env.VITE_API_URL);

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export default axiosInstance