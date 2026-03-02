import { useEffect, type PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { loadCurrentUser } from "@/features/auth/authSlice";

export const AppProviders = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    store.dispatch(loadCurrentUser());
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
