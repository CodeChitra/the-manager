import axios from "axios";
import { useAuthStore } from "../store";
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
      originalRequest._retry = true;
      try {
        const { data } = await axiosInstance.get("/auth/refresh", {
          withCredentials: true,
        });

        useAuthStore.getState().setToken(data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Refresh token failed", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
