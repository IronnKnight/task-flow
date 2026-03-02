import { Navigate } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { LoginForm } from "@/features/auth/components";
import { Spinner } from "@/shared/components";
import styles from "@/pages/LoginPage/styles.module.css";

export const LoginPage = () => {
  const { user, status } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return <Spinner label="Checking authentication..." />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Sign in</h1>
        <LoginForm />
      </section>
    </main>
  );
};
