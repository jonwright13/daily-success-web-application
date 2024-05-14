import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    const isAuthenticated = true;
    return isAuthenticated ? <Outlet /> : null; // or loading indicator, etc...
  }
  return <Navigate to={"/"} replace />;
};

export default AuthLayout;
