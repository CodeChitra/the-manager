import { useMutation } from "@tanstack/react-query";
import { Inputs } from "../components/EmployeeForm";
import axiosInstance from "../utils/axiosInstance";
import { useModalStore } from "../store";
import { toast } from "react-toastify";
import { queryClient } from "../main";
const useCreateEmployee = () => {
  const setIsCreateEmployeeModalOpen = useModalStore(
    (store) => store.setIsCreateEmployeeModalOpen
  );
  return useMutation({
    mutationFn: async (data: Inputs) => {
      await axiosInstance.post("/employees", data);
    },
    onSuccess: () => {
      setIsCreateEmployeeModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Task created successfully.😃");
    },
  });
};

export default useCreateEmployee;
