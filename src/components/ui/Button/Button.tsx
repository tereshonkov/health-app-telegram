import styles from "./Button.module.css";
import type { ReactNode } from "react";

interface Props {
  variant?: "primary" | "ghost";
  children: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  children,
  onClick,
  fullWidth = true,
}: Props) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${fullWidth ? styles.full : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
