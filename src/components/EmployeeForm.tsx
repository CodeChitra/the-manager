import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";

interface IEmployeeForm {
  onSubmit: SubmitHandler<Inputs>;
  isPending: boolean;
  prefetchedFormData?: Inputs;
}
const schema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .trim()
    .min(3, { message: "Username should contain at least 3 characters." })
    .max(40, { message: "Username can not contain more than 40 characters." })
    .toLowerCase(),

  age: z.preprocess((value) => {
    if (typeof value === "string" && value.trim() !== "") {
      return Number(value);
    }
    return value;
  }, z.number({ required_error: "Age is required!" }).min(16, { message: "Employee age cannot be less than 16." }).max(60, { message: "Employee age cannot be greater than 60." })),

  role: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Please provide valid job role.")
    .max(40, "Location cannot exceed more than 40 characters."),

  skills: z
    .array(z.string())
    .min(1, { message: "At least one skill is required." })
    .max(8, { message: "No more than 8 skills are allowed." })
    .optional(),

  experience: z.preprocess(
    (value) => {
      if (typeof value === "string" && value.trim() !== "") {
        return Number(value);
      }
      return value;
    },
    z
      .number()
      .min(0, { message: "Please fill valid experience in years." })
      .max(60 * 365, { message: "Please fill valid experience in years." })
      .default(0)
  ),

  location: z
    .string({ required_error: "Work Location is required!" })
    .trim()
    .min(3, "Please provide valid location.")
    .max(40, "Location cannot exceed more than 40 characters.")
    .toLowerCase(),
});

export type Inputs = z.infer<typeof schema>;

const EmployeeForm: FC<IEmployeeForm> = ({
  onSubmit,
  isPending,
  prefetchedFormData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: prefetchedFormData
      ? { ...prefetchedFormData }
      : {
          experience: 0,
          age: 16,
        },
  });
  return (
    <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        variant="outlined"
        {...register("name")}
      />
      {errors.name && (
        <Typography color="red" variant="body2">
          {errors.name.message}
        </Typography>
      )}
      <TextField
        label="Age"
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
        {...register("age")}
      />
      {errors.age && (
        <Typography color="red" variant="body2">
          {errors.age.message}
        </Typography>
      )}
      <TextField
        label="Role"
        fullWidth
        margin="normal"
        variant="outlined"
        {...register("role")}
      />
      {errors.role && (
        <Typography color="red" variant="body2">
          {errors.role.message}
        </Typography>
      )}
      <TextField
        label="Experience (Years)"
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
        {...register("experience")}
      />
      {errors.experience && (
        <Typography color="red" variant="body2">
          {errors.experience.message}
        </Typography>
      )}
      <TextField
        label="Location"
        fullWidth
        margin="normal"
        variant="outlined"
        {...register("location")}
      />
      {errors.location && (
        <Typography color="red" variant="body2">
          {errors.location.message}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default EmployeeForm;
