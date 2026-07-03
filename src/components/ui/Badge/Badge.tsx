import type { MeasureStatus } from "@/types";
import styles from "./Badge.module.css";

interface Props {
  status: MeasureStatus;
}

const config: Record<MeasureStatus, { label: string; cls: string }> = {
  ok: { label: "В норме", cls: "ok" },
  warn: { label: "Повышено", cls: "warn" },
  high: { label: "Высокое", cls: "high" },
  critical: { label: "КРИТИЧНО!", cls: "critical" },
};

export default function Badge({ status }: Props) {
  const { label, cls } = config[status];
  return <span className={`${styles.badge} ${styles[cls]}`}>{label}</span>;
}
