import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../App.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const currentLocation = useLocation();
  if (!user.email && user.role) {
    return <Navigate to="/login" state={{ from: currentLocation }} replace />;
  }

  return children;
}
