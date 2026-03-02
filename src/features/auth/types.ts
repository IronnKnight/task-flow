export type AuthUser = {
  id: string;
  email: string;
};

export type LoginPayload = {
  email: string;
};

export type AuthState = {
  user: AuthUser | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;
};