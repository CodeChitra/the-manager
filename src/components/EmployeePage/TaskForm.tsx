import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useCreateTask from "../../hooks/useCreateTask";
import { useParams } from "react-router-dom";

const schema = z.object({
  name: z
    .string()
    .min(3, "Task name should contain at least 3 characters.")
    .max(40, "Task name can not contain more than 20 characters.")
    .transform((val) => val.toLowerCase()),

  description: z
    .string({ required_error: "Please provide a description for the task" })
    .max(200, "Description can not exceed more than 200 characters."),

  estimatedTime: z.preprocess((value) => {
    if (typeof value === "string" && value.trim() !== "") {
      return Number(value);
    }
    return value;
  }, z.number().min(0, "Estimated time must be a positive number.").nonnegative("Estimated time must be a positive number.")),
  completed: z.boolean().default(false).optional(),
});

export type Inputs = z.infer<typeof schema>;

const TaskForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      estimatedTime: 0,
    },
  });
  const { id = "" } = useParams();
  const createTaskMutation = useCreateTask();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    createTaskMutation.mutate({ data, id });
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField label="Task Name" required {...register("name")} />
      {errors.name && (
        <Typography color="red" variant="body2">
          {errors.name.message}
        </Typography>
      )}
      <TextField
        label="Task Description"
        required
        multiline
        rows={3}
        {...register("description")}
      />
      {errors.description && (
        <Typography color="red" variant="body2">
          {errors.description.message}
        </Typography>
      )}
      <TextField
        label="Estimated Time (days)"
        required
        type="number"
        {...register("estimatedTime")}
      />
      {errors.estimatedTime && (
        <Typography color="red" variant="body2">
          {errors.estimatedTime.message}
        </Typography>
      )}
      <Button type="submit" variant="contained">
        Assign Task
      </Button>
    </Box>
  );
};

export default TaskForm;
