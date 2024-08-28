// src/components/EmployeePage/EmployeeCard.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ModalWrapper from "../ModalWrapper";
import EmployeeForm from "../EmployeeForm";
import ConfirmationModal from "./ConfirmationModal";

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
        open={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      >
        <EmployeeForm onSubmit={() => setUpdateModalOpen(false)} />
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
