import axios, { AxiosInstance } from "axios";
import store from "../redux/store";
import { clearAuthPerson, setToken } from "../redux/auth/authSlice";
import { showErrorToast } from "../utils/toast";
import { refreshAT } from "../redux/auth/authThunk";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.data.status === 403) {
      store.dispatch(clearAuthPerson());
      showErrorToast(error.response.data.message);
      window.location.href = "/sign-in";
      return;
    }

    if (
      error.response &&
      error.response.data.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await store.dispatch(refreshAT()).unwrap();
        store.dispatch(setToken(newAccessToken));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("Refresh token failed", err);
        store.dispatch(clearAuthPerson());
        window.location.href = "/sign-in";
        showErrorToast("Your session has expired. Please sign-in again.");
      }
    }

    return Promise.reject(error);
  }
);

export const cloudinaryAxiosInstance = (cloudName: string) => {
  const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL.replace(
    "{cloud_name}",
    cloudName
  );

  return axios.create({
    baseURL: `${CLOUDINARY_URL}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: false,
  });
};

export default axiosInstance;
