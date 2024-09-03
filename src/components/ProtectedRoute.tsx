import { FC } from "react";
import { useAuthStore } from "../store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const token = useAuthStore((store) => store.token);
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
