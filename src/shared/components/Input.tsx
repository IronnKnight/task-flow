import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "@/shared/components/Input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const classes = className ? `${styles.input} ${className}` : styles.input;

    return <input ref={ref} className={classes} {...props} />;
  },
);

Input.displayName = "Input";
