import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>; //replace={true}
  }

  return <Outlet />;
}
    