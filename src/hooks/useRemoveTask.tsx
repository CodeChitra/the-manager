import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { queryClient } from "../main";
import { toast } from "react-toastify";
import { useModalStore } from "../store";

const useRemoveTask = () => {
  const setIsRemoveTaskModalOpen = useModalStore(
    (store) => store.setIsRemoveTaskModalOpen
  );
  return useMutation({
    mutationFn: async ({
      employeeId,
      taskId,
    }: {
      employeeId: string;
      taskId: string;
    }) => {
      await axiosInstance.delete(`/tasks/${employeeId}/${taskId}`);
      return employeeId;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["employeeDetail", id] });
      toast.success("Task deleted successfully.🗑️");
      setIsRemoveTaskModalOpen(false);
    },
  });
};
export default useRemoveTask;
