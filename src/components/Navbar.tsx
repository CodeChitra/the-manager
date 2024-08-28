import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" sx={{ height: "64px" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            TheManager
          </Link>
        </Typography>
        <Box>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 15px",
            }}
          >
            Home
          </Link>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 15px",
            }}
          >
            Register
          </Link>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 15px",
            }}
          >
            Login
          </Link>
          <Link
            to="/employees"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 15px",
            }}
          >
            Employees
          </Link>
          <Link
            to="/employees/1"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 15px",
            }}
          >
            EmployeeDetail
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
