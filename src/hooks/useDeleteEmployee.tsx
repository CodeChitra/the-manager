import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useModalStore } from "../store";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import { toast } from "react-toastify";

const useDeleteEmployee = () => {
  const setIsDeleteEmployeeModalOpen = useModalStore(
    (store) => store.setIsDeleteEmployeeModalOpen
  );
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsDeleteEmployeeModalOpen(false);
      navigate("/employees");
      toast.success("Employee Deleted successfully.😃");
    },
  });
};

export default useDeleteEmployee;
