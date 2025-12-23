import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function RootRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "kasir") return <Navigate to="/kasir" replace />;
  if (user.role === "gudang") return <Navigate to="/gudang" replace />;

  return <Navigate to="/login" replace />;
}
