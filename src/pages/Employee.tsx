import { Box, Typography, useMediaQuery } from "@mui/material";
import EmployeeCard from "../components/EmployeePage/EmployeeCard";
import AssignTaskButton from "../components/EmployeePage/AssignTaskButton";
import TaskLists from "../components/EmployeePage/TaskLists";
import useEmployeeDetail from "../hooks/useEmployeeDetail";
import { useParams } from "react-router-dom";

export type Task = {
  _id: string;
  name: string;
  description: string;
  estimatedTime: number;
  completed?: boolean;
  completedTime?: number;
  createdAt?: string;
  updatedAt?: string;
};
const EmployeePage: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { id = "" } = useParams();
  const { data } = useEmployeeDetail(id);
  const activeTasks = data?.tasks.filter((task: Task) => !task.completed) || [];
  const completedTasks =
    data?.tasks.filter((task: Task) => task.completed) || [];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        gap: 4,
        p: 4,
      }}
    >
      {/* Left Column: Employee Details */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Employee Details
        </Typography>
        <EmployeeCard {...data?.employeeDetail} />
      </Box>

      {/* Middle Column: Active Tasks */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" gutterBottom>
          Active Tasks
        </Typography>
        <AssignTaskButton />
        <Box sx={{ mt: 2 }}>
          <TaskLists type="active" tasks={activeTasks} />
        </Box>
      </Box>

      {/* Right Column: Completed Tasks */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" gutterBottom>
          Completed Tasks
        </Typography>
        <Box sx={{ mt: 4 }}>
          <TaskLists type="completed" tasks={completedTasks} />
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeePage;
