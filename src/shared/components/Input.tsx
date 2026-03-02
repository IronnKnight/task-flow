import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "@/shared/components/Input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const baseClass =
      type === "radio" || type === "checkbox" ? styles.choice : styles.input;
    const classes = className ? `${baseClass} ${className}` : baseClass;

    return <input ref={ref} type={type} className={classes} {...props} />;
  },
);

Input.displayName = "Input";
