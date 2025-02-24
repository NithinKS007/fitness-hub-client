import axios, { AxiosInstance } from "axios";
import store from "../redux/store";
import { clearUser } from "../redux/auth/authSlice";
import { showErrorToast } from "../utils/toast";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
  
     if(error.response && error.response.data.status===403) {
      
      store.dispatch(clearUser());
      localStorage.clear();
      showErrorToast(error.response.data.message);
      window.location.href = '/sign-in';
     }
    if (error.response && error.response.data.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("inside axios if condition refresh token triggering")

      try {

        console.log("inside axios refresh token triggering")
        const response = await axiosInstance.post('/auth/refresh-token', {}, { withCredentials: true });

        console.log(response,"haha")
        const { newAccessToken } = response.data.data

        console.log("new accesstoken",newAccessToken)

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("getting inside catch block axios for refreshing")
        console.log('Refresh token failed', err)
        store.dispatch(clearUser());
        localStorage.clear();
        window.location.href = '/sign-in';
        showErrorToast("Your session has expired. Please sign-in again.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance