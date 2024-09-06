// src/components/EmployeePage/TaskCard.tsx
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";
import { Task } from "../../pages/Employee";
import { capitalizeFirstLetter } from "../../utils/helpers";
interface TaskCardProps {
  task: Task;
  completed?: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onConfirm: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  completed = false,
  isModalOpen,
  setIsModalOpen,
  onConfirm,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{capitalizeFirstLetter(task.name)}</Typography>
        <Typography variant="body2">
          {capitalizeFirstLetter(task.description)}
        </Typography>
        <Typography variant="body2">
          Estimated Time: {task.estimatedTime} days
        </Typography>
        {completed && (
          <Typography variant="body2">
            Completed Time: {task.completedTime} days
          </Typography>
        )}
      </CardContent>
      <Button onClick={() => setIsModalOpen(true)}>
        {completed ? "Remove Task" : "Mark as Completed"}
      </Button>

      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onConfirm}
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
