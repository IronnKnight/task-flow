import type { ReactNode } from "react";
import styles from "@/shared/layout/AppLayout/styles.module.css";

type AppLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

export const AppLayout = ({ header, children }: AppLayoutProps) => {
  return (
    <div className={styles.layout}>
      {header}
      <main className={styles.content}>{children}</main>
    </div>
  );
};
