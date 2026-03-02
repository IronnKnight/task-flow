import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";
import { Button } from "@/shared/components";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const isLoggingOut = status === "loading";

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <>
      <Button type="button" onClick={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? "Signing out..." : "Sign out"}
      </Button>
      {status === "error" && error ? <p role="alert">{error}</p> : null}
    </>
  );
};
