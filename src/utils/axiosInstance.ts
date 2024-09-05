import axios from "axios";
import { useAuthStore } from "../store";
import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      if (originalRequest.url === "/auth/refresh") {
        toast.error("Session expired. Please log in again.");
        useAuthStore.getState().setToken(null);
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      try {
        const { data } = await axiosInstance.get("/auth/refresh", {
          withCredentials: true,
        });

        useAuthStore.getState().setToken(data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        toast.error("Session expired. Please log in again.");
        useAuthStore.getState().setToken(null);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
