import { Box, Typography, useMediaQuery } from "@mui/material";
import EmployeeCard from "../components/EmployeePage/EmployeeCard";
import AssignTaskButton from "../components/EmployeePage/AssignTaskButton";
import TaskLists from "../components/EmployeePage/TaskLists";

const EmployeePage: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const employeeData = {
    name: "Akash Deep Chitransh",
    age: 21,
    role: "Front-End Engineer",
    experience: 2,
    location: "Indore",
  };

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
        <EmployeeCard {...employeeData} />
      </Box>

      {/* Middle Column: Active Tasks */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" gutterBottom>
          Active Tasks
        </Typography>
        <AssignTaskButton />
        <Box sx={{ mt: 2 }}>
          <TaskLists type="active" />
        </Box>
      </Box>

      {/* Right Column: Completed Tasks */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" gutterBottom>
          Completed Tasks
        </Typography>
        <Box sx={{ mt: 4 }}>
          <TaskLists type="completed" />
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeePage;
