import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store";

const useLogout = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((store) => store.setToken);
  return useMutation({
    mutationFn: async () => {
      return axiosInstance.get("/auth/logout", { withCredentials: true });
    },
    onSuccess: () => {
      navigate("/");
      setToken(null);
      toast.success("User Logged Out successfully. Please comback soon 😃", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });
};

export default useLogout;
