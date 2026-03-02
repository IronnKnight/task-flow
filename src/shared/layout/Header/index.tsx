import type { ReactNode } from "react";
import styles from "@/shared/layout/Header/styles.module.css";

type HeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export const Header = ({ title, subtitle, actions }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
};
