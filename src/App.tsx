import { FC } from "react";
import Employee from "./pages/Employee";
import Employees from "./pages/Employees";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

interface AppProps {}

const App: FC<AppProps> = ({}) => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<Employee />} />
      </Routes>
    </Router>
  );
};

export default App;
