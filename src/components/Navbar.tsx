import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const token = useAuthStore((store) => store.token);
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <AppBar position="static" color="primary" sx={{ height: "64px" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            TheManager
          </Link>
        </Typography>
        <Box>
          {!token && [
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: "0 15px",
              }}
            >
              Register
            </Link>,
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: "0 15px",
              }}
            >
              Login
            </Link>,
          ]}

          {token && [
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: "0 15px",
              }}
            >
              Home
            </Link>,
            <Link
              to="/employees"
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: "0 15px",
              }}
            >
              Employees
            </Link>,
            <Link
              to="/employees/1"
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: "0 15px",
              }}
            >
              EmployeeDetail
            </Link>,
            <Button onClick={handleLogout} variant="contained">
              Logout
            </Button>,
          ]}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
