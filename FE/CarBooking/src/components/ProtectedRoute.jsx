import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ErrorPage from "./ErrorPage";
import React from "react";

const ProtectedRoute = ({ children, roles }) => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(user.roleName)) {
    return <ErrorPage />;
  }
  // If user is authenticated and has the right role, render the children
  return children;
};

export default ProtectedRoute;
