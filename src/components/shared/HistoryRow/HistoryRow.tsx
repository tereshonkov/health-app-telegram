import Badge from "@components/ui/Badge/Badge";
import { getMeasureStatus } from "@store/measures";
import type { Measure } from "@/types";
import styles from "./HistoryRow.module.css";

interface Props {
  measure: Measure;
  onDelete?: (id: string) => void;
}

export default function HistoryRow({ measure, onDelete }: Props) {
  const status = getMeasureStatus(measure);

  const date = new Date(measure.date);
  const dateStr = date.toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const timeStr = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.row}>
      <span className={`${styles.dot} ${styles[status]}`} />

      <div className={styles.meta}>
        <p className={`${styles.date} mono`}>{dateStr}</p>
        <p className={`${styles.date} mono`}>{timeStr}</p>
        {measure.note && <span className={styles.note}>{measure.note}</span>}
      </div>

      <div className={styles.valuesWrapper}>
        <p className={`${styles.values} mono`}>
          {measure.systolic}/{measure.diastolic}
        </p>
        <p className={`${styles.values} mono`}>{measure.pulse}</p>
      </div>

      <Badge status={status} />

      {onDelete && (
        <button className={styles.del} onClick={() => onDelete(measure.id)}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="var(--danger)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
