// FILE: src/routes/AuthGuard.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext1";

export default function AuthGuard({ children }) {
  const { session } = useContext(AuthContext);
  const loc = useLocation();
  if (!session)
    return <Navigate to="/auth/login" state={{ from: loc.pathname }} replace />;
  return children;
}
