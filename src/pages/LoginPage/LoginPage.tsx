import { Navigate } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Spinner } from "@/shared/components";

export const LoginPage = () => {
  const { user, status } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return <Spinner label="Checking authentication..." />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main>
      <h1>Sign in</h1>
      <LoginForm />
    </main>
  );
};
