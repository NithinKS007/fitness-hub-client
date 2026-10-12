import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
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

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };
let refreshPromise: Promise<string> | null = null;

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
    const status = error.response?.data?.status ?? error.response?.status;
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (status === 403) {
      store.dispatch(clearAuthPerson());
      showErrorToast(error.response?.data?.message ?? "Access denied");
      window.location.href = "/sign-in";
      return;
    }

    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh-token");
    if (status === 401 && originalRequest && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        refreshPromise ??= store.dispatch(refreshAT()).unwrap();
        const newAccessToken = await refreshPromise;
        store.dispatch(setToken(newAccessToken));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        store.dispatch(clearAuthPerson());
        window.location.href = "/sign-in";
        showErrorToast("Your session has expired. Please sign-in again.");
      } finally {
        refreshPromise = null;
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
