import { useMutation } from "@tanstack/react-query";
import { useModalStore } from "../store";
import axiosInstance from "../utils/axiosInstance";
import { queryClient } from "../main";
import { toast } from "react-toastify";

const useUpdateTask = () => {
  const setIsUpdateTaskModalOpen = useModalStore(
    (store) => store.setIsUpdateTaskModalOpen
  );
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { completed: boolean };
    }) => {
      try {
        await axiosInstance.put(`/tasks/${id}`, data);
        return id;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    onSuccess: (id) => {
      setIsUpdateTaskModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employeeDetail", id] });
      toast.success("Task marked as completed.✅");
    },
  });
};
export default useUpdateTask;
