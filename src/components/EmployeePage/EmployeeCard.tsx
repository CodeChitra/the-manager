import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ModalWrapper from "../ModalWrapper";
import ConfirmationModal from "./ConfirmationModal";
import UpdateEmployeeForm from "../UpdateEmployeeForm";
import { useModalStore } from "../../store";
import { useParams } from "react-router-dom";
import useDeleteEmployee from "../../hooks/useDeleteEmployee";
import { capitalizeFirstLetter } from "../../utils/helpers";

interface EmployeeCardProps {
  name: string;
  age: number;
  role: string;
  experience: number;
  location: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  age,
  role,
  experience,
  location,
}) => {
  const {
    isUpdateEmployeeModalOpen,
    setIsUpdateEmployeeModalOpen,
    isDeleteEmployeeModalOpen,
    setIsDeleteEmployeeModalOpen,
  } = useModalStore((store) => store);
  const { id = "" } = useParams();
  const deleteEmployeeMutation = useDeleteEmployee();
  const handleDeleteEmployee = () => {
    deleteEmployeeMutation.mutate(id);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{capitalizeFirstLetter(name)}</Typography>
        <Typography variant="body2">Age: {age}</Typography>
        <Typography variant="body2">
          Role: {capitalizeFirstLetter(role)}
        </Typography>
        <Typography variant="body2">Experience: {experience} years</Typography>
        <Typography variant="body2">
          Location: {capitalizeFirstLetter(location)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setIsUpdateEmployeeModalOpen(true)}>
          Update
        </Button>
        <Button
          color="error"
          onClick={() => setIsDeleteEmployeeModalOpen(true)}
        >
          Delete
        </Button>
      </CardActions>

      {/* Update Modal */}
      <ModalWrapper
        title="Update Employee Details"
        open={isUpdateEmployeeModalOpen}
        onClose={() => setIsUpdateEmployeeModalOpen(false)}
      >
        <UpdateEmployeeForm />
      </ModalWrapper>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteEmployeeModalOpen}
        onClose={() => setIsDeleteEmployeeModalOpen(false)}
        onConfirm={handleDeleteEmployee}
        title="Are you sure?"
        message="Do you really want to delete this employee?"
      />
    </Card>
  );
};

export default EmployeeCard;
