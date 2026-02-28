import type { ReactNode } from "react";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  isAllowed: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({ isAllowed, children }: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
