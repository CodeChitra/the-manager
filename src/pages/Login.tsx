import { zodResolver } from "@hookform/resolvers/zod";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import useLogin from "../hooks/useLogin";
import { useEffect } from "react";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .email("Please fill a valid email!"),
  password: z.string({ required_error: "Password is required!" }),
});

type Inputs = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const loginMutation = useLogin();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    return loginMutation.mutate(data);
  };

  const navigate = useNavigate();
  const token = useAuthStore((store) => store.token);
  useEffect(() => {
    if (token) {
      navigate("/employees");
    }
  }, [token, navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
