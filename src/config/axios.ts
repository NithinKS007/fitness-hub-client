import axios, { AxiosInstance } from "axios";

console.log(import.meta.env.VITE_API_URL);  // Should output http://localhost:7000/api/v1

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export default axiosInstance