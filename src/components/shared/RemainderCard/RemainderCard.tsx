import { useReminders } from "@hooks/useReminders";
import Card from "@components/ui/Card/Card";
import styles from "./ReminderCard.module.css";

export default function ReminderCard() {
  const { reminders } = useReminders();

  const next = reminders.find((r) => r.enabled);

  if (!next) return null;

  return (
    <Card>
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
          <span className={styles.name}>
            {next.name} · {next.dose}
          </span>
          <span className={styles.time}>Сегодня в {next.times[0]}</span>
        </div>
        <span className={styles.badge}>скоро</span>
      </div>
    </Card>
  );
}
