import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Employee Management System
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
        Manage your team's information, tasks, and more with ease.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
