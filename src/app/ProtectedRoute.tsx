import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "@/app/hooks";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, status } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
