import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { login } from "@/features/auth/authSlice";
import { Button, Input } from "@/shared/components";
import styles from "@/features/auth/components/LoginForm/styles.module.css";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const isLoading = status === "loading";

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await dispatch(login({ email }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        autoComplete="email"
      />

      <Button type="submit" disabled={isLoading} className={styles.submit}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      {error ? (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </form>
  );
};
