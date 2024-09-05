import { FC } from "react";
import EmployeeForm, { Inputs } from "./EmployeeForm";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import useEmployeeDetail from "../hooks/useEmployeeDetail";
import useUpdateEmployee from "../hooks/useUpdateEmployee";

const UpdateEmployeeForm: FC = () => {
  const { id = "" } = useParams();
  const { data } = useEmployeeDetail(id);
  const prefetchedFormData = {
    name: data?.employeeDetail.name,
    age: data?.employeeDetail.age,
    role: data?.employeeDetail.role,
    experience: data?.employeeDetail.experience,
    location: data?.employeeDetail.location,
  };
  const updateEmployeeMutation = useUpdateEmployee();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateEmployeeMutation.mutate({ data, id });
  };
  return (
    <EmployeeForm
      onSubmit={onSubmit}
      isPending={updateEmployeeMutation.isPending}
      prefetchedFormData={prefetchedFormData}
    />
  );
};

export default UpdateEmployeeForm;
