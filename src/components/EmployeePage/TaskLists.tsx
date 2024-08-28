import { Box } from "@mui/material";
import TaskCard from "./TaskCard";

interface TaskListsProps {
  type: "active" | "completed";
}

const TaskLists: React.FC<TaskListsProps> = ({ type }) => {
  const tasks =
    type === "active"
      ? [
          {
            id: 1,
            name: "Task 1",
            description: "Description of task 1",
            estimatedTime: 2,
          },
          {
            id: 2,
            name: "Task 2",
            description: "Description of task 2",
            estimatedTime: 3,
          },
        ]
      : [
          {
            id: 3,
            name: "Task 3",
            description: "Description of task 3",
            estimatedTime: 1,
            completed: true,
          },
        ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} completed={type === "completed"} />
      ))}
    </Box>
  );
};

export default TaskLists;
