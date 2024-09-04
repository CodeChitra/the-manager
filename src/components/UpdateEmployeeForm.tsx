import { FC } from "react";
import EmployeeForm, { Inputs } from "./EmployeeForm";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import useEmployeeDetail from "../hooks/useEmployeeDetail";

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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <EmployeeForm
      onSubmit={onSubmit}
      isPending={false}
      prefetchedFormData={prefetchedFormData}
    />
  );
};

export default UpdateEmployeeForm;
