import type { HTMLAttributes } from "react";
import styles from "@/shared/components/Spinner.module.css";

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
};

export const Spinner = ({ label = "Loading...", ...props }: SpinnerProps) => {
  const classes = props.className
    ? `${styles.spinner} ${props.className}`
    : styles.spinner;

  return (
    <span role="status" aria-label={label} {...props} className={classes}>
      {label}
    </span>
  );
};
