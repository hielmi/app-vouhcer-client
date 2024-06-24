import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export const ProtectedRouteJustAdmin: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { authenticated, user } = useAuth();

  if (!authenticated && user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};
