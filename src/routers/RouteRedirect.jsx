import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function RootRedirect() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={`/${user.role}`} replace />;
}
