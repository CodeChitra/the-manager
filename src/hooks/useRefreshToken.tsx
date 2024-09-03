import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import axiosInstance from "../utils/axiosInstance";

const useRefreshToken = () => {
  const setToken = useAuthStore((store) => store.setToken);
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.get("/auth/refresh", {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
    },
  });
};

export default useRefreshToken;
