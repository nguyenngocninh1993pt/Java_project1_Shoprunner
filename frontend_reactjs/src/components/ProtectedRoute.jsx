import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, isAdminRequired }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // Chưa đăng nhập -> đá ra trang login

  if (isAdminRequired && user.role !== "admin") {
    return <Navigate to="/" />; // Không phải admin -> đá về trang chủ
  }

  return children;
};