import { LoginForm } from "@/features/auth/components";
import styles from "@/pages/LoginPage/styles.module.css";

export const LoginPage = () => {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Sign in</h1>
        <LoginForm />
      </section>
    </main>
  );
};
