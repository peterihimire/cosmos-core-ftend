import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  isAllowed: boolean;
  redirectPath?: string;
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isAllowed,
  redirectPath = "/auth/login",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
