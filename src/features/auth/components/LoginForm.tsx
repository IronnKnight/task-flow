import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { login } from "@/features/auth/authSlice";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        autoComplete="email"
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      {error ? <p role="alert">{error}</p> : null}
    </form>
  );
};
