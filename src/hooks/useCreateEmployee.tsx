import { useMutation } from "@tanstack/react-query";
import { Inputs } from "../components/EmployeeForm";
import axiosInstance from "../utils/axiosInstance";
import { useModalStore } from "../store";
import { toast } from "react-toastify";
import { queryClient } from "../main";
const useCreateEmployee = () => {
  const setIsModalOpen = useModalStore((store) => store.setIsModalOpen);
  return useMutation({
    mutationFn: async (data: Inputs) => {
      await axiosInstance.post("/employees", data);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee created successfully.😃", {
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

export default useCreateEmployee;
