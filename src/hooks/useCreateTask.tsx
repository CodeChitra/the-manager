import { useMutation } from "@tanstack/react-query";
import { Inputs } from "../components/EmployeePage/TaskForm";
import axiosInstance from "../utils/axiosInstance";
import { queryClient } from "../main";
import { useModalStore } from "../store";

const useCreateTask = () => {
  const setIsCreateTaskModalOpen = useModalStore(
    (store) => store.setIsCreateTaskModalOpen
  );
  return useMutation({
    mutationFn: async ({ data, id }: { data: Inputs; id: string }) => {
      await axiosInstance.post(`/tasks/${id}`, data);
      return id;
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["employeeDetail", id] });
      setIsCreateTaskModalOpen(false);
    },
  });
};

export default useCreateTask;
