import type { Reminder } from "@/types";
import styles from "./ReminderRow.module.css";

interface Props {
  reminder: Reminder;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ReminderRow({ reminder, onToggle, onDelete }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.icon}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M9 3h6M8 3a4 4 0 00-4 4v9h16V7a4 4 0 00-4-4"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 16h16l-1 3a2 2 0 01-2 2H7a2 2 0 01-2-2l-1-3z"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={styles.info}>
        <span className={styles.name}>{reminder.name}</span>
        <span className={styles.dose}>{reminder.dose}</span>
        <div className={styles.times}>
          {reminder.times.map((t) => (
            <span key={t} className={styles.time}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        {/* Toggle */}
        <button
          className={`${styles.toggle} ${reminder.enabled ? styles.on : ""}`}
          onClick={() => onToggle(reminder.id)}
        >
          <span className={styles.thumb} />
        </button>

        {/* Delete */}
        <button className={styles.del} onClick={() => onDelete(reminder.id)}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="var(--danger)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
