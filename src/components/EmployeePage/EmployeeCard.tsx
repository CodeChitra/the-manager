import React, { useState } from "react";
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
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Age: {age}</Typography>
        <Typography variant="body2">Role: {role}</Typography>
        <Typography variant="body2">Experience: {experience} years</Typography>
        <Typography variant="body2">Location: {location}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setUpdateModalOpen(true)}>Update</Button>
        <Button color="error" onClick={() => setDeleteModalOpen(true)}>
          Delete
        </Button>
      </CardActions>

      {/* Update Modal */}
      <ModalWrapper
        title="Update Employee Details"
        open={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      >
        <UpdateEmployeeForm />
      </ModalWrapper>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          // Handle delete logic
          setDeleteModalOpen(false);
        }}
        title="Are you sure?"
        message="Do you really want to delete this employee?"
      />
    </Card>
  );
};

export default EmployeeCard;
