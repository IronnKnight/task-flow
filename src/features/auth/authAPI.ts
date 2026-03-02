import { delay } from "@/shared/utils/delay";
import type { AuthUser, LoginPayload } from "@/features/auth/types";

const STORAGE_KEY = "task-flow-auth-user";

export const loginRequest = async (payload: LoginPayload): Promise<AuthUser> => {
  await delay(500);

  const email = payload.email.trim().toLowerCase();

  if (!email) {
    throw new Error("Email is required.");
  }

  const user: AuthUser = {
    id: crypto.randomUUID(),
    email,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

  return user;
};

export const logoutRequest = async (): Promise<void> => {
  await delay(300);
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUserRequest = async (): Promise<AuthUser | null> => {
  await delay(300);

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};