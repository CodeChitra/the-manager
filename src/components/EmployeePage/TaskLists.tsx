import { Box, Typography } from "@mui/material";
import { Task } from "../../pages/Employee";
import CompletedTaskCard from "./CompletedTaskCard";
import ActiveTaskCard from "./ActiveTaskCard";

interface TaskListsProps {
  type: "active" | "completed";
  tasks: Task[];
}

const TaskLists: React.FC<TaskListsProps> = ({ type, tasks }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {tasks.length > 0 &&
        tasks.map((task) =>
          type === "completed" ? (
            <CompletedTaskCard key={task._id} task={task} />
          ) : (
            <ActiveTaskCard key={task._id} task={task} />
          )
        )}
      {tasks.length === 0 && <Typography>No {type} tasks found.</Typography>}
    </Box>
  );
};

export default TaskLists;
