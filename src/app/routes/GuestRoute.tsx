import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { Spinner } from "@/shared/components";

type GuestRouteProps = {
  children: ReactNode;
};

export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { user, status } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return <Spinner label="Checking authentication..." />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
