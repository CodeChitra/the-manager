import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import axiosInstance from "../utils/axiosInstance";

const useLogin = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((store) => store.setToken);
  return useMutation({
    mutationFn: async (userCredentials: {
      email: string;
      password: string;
    }) => {
      const { data } = await axiosInstance.post("/auth/login", userCredentials);
      return data;
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate("/employees");
    },
  });
};

export default useLogin;
