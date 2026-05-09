import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children, role }) {

  const { user } = useAuth();

  if (!user) {
    console.log("PrivateRoute: No user found. Required role:", role);
    if (role === "admin") return <Navigate to="/login/staff" />;
    if (role === "nurse") return <Navigate to="/login/staff" />;
    if (role === "student") return <Navigate to="/login/student" />;
    return <Navigate to="/login" />;
  }

  if (!user.role) {
    console.log("PrivateRoute: User logged in but MISSING role property.", user);
    return <Navigate to="/login" />;
  }

  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    console.log("PrivateRoute: Role mismatch!", { required: role, found: user.role });
    return <Navigate to="/" />;
  }

  return children;
}
