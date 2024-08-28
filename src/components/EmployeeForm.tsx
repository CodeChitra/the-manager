import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
interface EmployeeFormProps {
  onSubmit: (data: any) => void;
  initialValues?: {
    name: string;
    age: number;
    role: string;
    experience: number;
    location: string;
  };
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [formValues, setFormValues] = useState(
    initialValues || {
      name: "",
      age: 0,
      role: "",
      experience: 0,
      location: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Age"
        name="age"
        value={formValues.age}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Role"
        name="role"
        value={formValues.role}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Experience (Years)"
        name="experience"
        value={formValues.experience}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Location"
        name="location"
        value={formValues.location}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default EmployeeForm;
