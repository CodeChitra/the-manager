import { useMutation } from "@tanstack/react-query";

const useUpdateEmployee = () => {
  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {},
  });
};

export default useUpdateEmployee;
