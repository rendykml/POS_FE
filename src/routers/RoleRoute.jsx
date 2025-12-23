import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function RoleRoute({ allowedRoles, children }) {
  const { role } = useAuth();

  if (!role) return null;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
