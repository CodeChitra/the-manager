import { FC, useEffect } from "react";
import Employee from "./pages/Employee";
import Employees from "./pages/Employees";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import useRefreshToken from "./hooks/useRefreshToken";
import { useAuthStore } from "./store";
const App: FC = () => {
  const token = useAuthStore((store) => store.token);
  const { mutate } = useRefreshToken();
  useEffect(() => {
    if (!token) {
      mutate();
    }
  }, [token, mutate]);
  return (
    <main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/employees" element={<Employees />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/employees/:id" element={<Employee />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
