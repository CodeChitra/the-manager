import { useMutation } from "@tanstack/react-query";
import { Inputs } from "../components/EmployeeForm";
import axiosInstance from "../utils/axiosInstance";
import { useModalStore } from "../store";
import { queryClient } from "../main";
import { toast } from "react-toastify";

const useUpdateEmployee = () => {
  const setIsUpdateEmployeeModalOpen = useModalStore(
    (store) => store.setIsUpdateEmployeeModalOpen
  );
  return useMutation({
    mutationFn: async ({ data, id }: { data: Inputs; id: string }) => {
      await axiosInstance.put(`/employees/${id}`, data);
      return id;
    },
    onSuccess: (id: string) => {
      setIsUpdateEmployeeModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employeeDetail", id] });
      toast.success("Employee Updated successfully.😃");
    },
  });
};

export default useUpdateEmployee;
