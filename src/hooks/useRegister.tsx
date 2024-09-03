import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (newUser: {
      name: string;
      email: string;
      password: string;
    }) => {
      return axiosInstance.post("/auth/register", newUser);
    },
    onSuccess: () => {
      navigate("/login");
      toast.success("User created successfully.😃", {
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

export default useRegister;
