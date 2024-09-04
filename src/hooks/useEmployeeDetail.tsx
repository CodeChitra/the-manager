import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const useEmployeeDetail = (id: string) => {
  return useQuery({
    queryKey: ["employeeDetail", id],
    queryFn: async () => {
      const [employeeDetail, tasks] = await Promise.all([
        axiosInstance.get(`/employees/${id}`).then((data) => data),
        axiosInstance.get(`/tasks/${id}`).then((data) => data),
      ]);

      return {
        employeeDetail: employeeDetail.data.employee,
        tasks: tasks.data.tasks,
      };
    },
  });
};

export default useEmployeeDetail;
