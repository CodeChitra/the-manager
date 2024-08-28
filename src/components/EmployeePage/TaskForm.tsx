import { Box, TextField, Button } from "@mui/material";

interface TaskFormProps {
  onSubmit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(); // Replace with form data
      }}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField label="Task Name" required />
      <TextField label="Task Description" required multiline rows={3} />
      <TextField label="Estimated Time (days)" required type="number" />
      <Button type="submit" variant="contained">
        Assign Task
      </Button>
    </Box>
  );
};

export default TaskForm;
