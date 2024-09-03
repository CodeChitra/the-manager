import { Container, TextField, Button, Typography, Box } from "@mui/material";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../hooks/useRegister";

const passwordSchema = z
  .string({ required_error: "password is required!" })
  .min(6, "Password must be at least 6 characters long")
  .max(12, "Password must be at most 12 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character");

const schema = z
  .object({
    name: z
      .string({ required_error: "name is required!" })
      .min(3, "Username should contain atleast 3 characters.")
      .max(40, "Username can not contain more than 40 characters."),
    email: z
      .string({ required_error: "Email is required!" })
      .email("Please fill a valid email!"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

type Inputs = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const registerMutation = useRegister();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    registerMutation.mutate(userInfo);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            required
            {...register("name")}
          />
          {errors.name && (
            <Typography color="red" variant="body2">
              {errors.name.message}
            </Typography>
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            {...register("email")}
          />
          {errors.email && (
            <Typography color="red" variant="body2">
              {errors.email.message}
            </Typography>
          )}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            {...register("password")}
          />
          {errors.password && (
            <Typography color="red" variant="body2">
              {errors.password.message}
            </Typography>
          )}
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            required
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <Typography color="red" variant="body2">
              {errors.confirmPassword.message}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={registerMutation.isPending}
            sx={{ mt: 3 }}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
