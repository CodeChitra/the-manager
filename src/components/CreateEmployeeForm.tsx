import { FC } from "react";
import EmployeeForm, { Inputs } from "./EmployeeForm";
import { SubmitHandler } from "react-hook-form";
import useCreateEmployee from "../hooks/useCreateEmployee";

const CreateEmployeeForm: FC = () => {
  const { mutate, isPending } = useCreateEmployee();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    mutate(data);
  };
  return <EmployeeForm onSubmit={onSubmit} isPending={isPending} />;
};

export default CreateEmployeeForm;
