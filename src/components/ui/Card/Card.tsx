import styles from "./Card.module.css";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  hero?: boolean;
  padding?: string;
}

export default function Card({ children, hero = false, padding }: Props) {
  return (
    <div
      className={`${styles.card} ${hero ? styles.hero : ""}`}
      style={padding ? { padding } : undefined}
    >
      {children}
    </div>
  );
}
