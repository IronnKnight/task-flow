import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import styles from "@/shared/components/Button/styles.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", className, ...props }, ref) => {
    const classes = className
      ? `${styles.button} ${className}`
      : styles.button;

    return <button ref={ref} type={type} className={classes} {...props} />;
  },
);

Button.displayName = "Button";
