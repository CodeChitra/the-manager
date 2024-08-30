// src/components/EmployeePage/TaskCard.tsx
import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";

interface TaskCardProps {
  task: {
    id: number;
    name: string;
    description: string;
    estimatedTime: number;
    completed?: boolean;
    completedTime?: number;
  };
  completed?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, completed = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{task.name}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2">
          Estimated Time: {task.estimatedTime} days
        </Typography>
        {completed && (
          <Typography variant="body2">
            Completed Time: {task.completedTime} days
          </Typography>
        )}
      </CardContent>
      <Button onClick={() => setModalOpen(true)}>
        {completed ? "Remove Task" : "Mark as Completed"}
      </Button>

      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          // Handle task completion or removal logic
          setModalOpen(false);
        }}
        title={completed ? "Remove Task" : "Mark Task as Completed"}
        message={
          completed
            ? "Do you really want to remove this task?"
            : "Are you sure you want to mark this task as completed?"
        }
      />
    </Card>
  );
};

export default TaskCard;
