import { useEffect, type PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { useAppDispatch } from "@/app/hooks";
import { loadCurrentUser } from "@/features/auth/authSlice";

const StartupLoader = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
};

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <StartupLoader>{children}</StartupLoader>
    </Provider>
  );
};