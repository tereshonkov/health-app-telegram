import { useReminders } from "@hooks/useReminders";
import Card from "@components/ui/Card/Card";
import styles from "./ReminderCard.module.css";

function getNextTime(times: string[]): { time: string; label: string } | null {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const sorted = [...times].sort();

  for (const t of sorted) {
    const [h, m] = t.split(":").map(Number);
    const timeMinutes = h * 60 + m;
    const diff = timeMinutes - currentMinutes;

    if (diff > 0) {
      if (diff < 60) return { time: t, label: "скоро" };
      const hours = Math.floor(diff / 60);
      const mins = diff % 60;
      return {
        time: t,
        label: mins > 0 ? `через ${hours} ч ${mins} хв` : `через ${hours} ч`,
      };
    }
  }

  // Всі часи сьогодні пройшли — показуємо перший завтра
  const first = sorted[0];
  return { time: first, label: "завтра" };
}

export default function ReminderCard() {
  const { reminders } = useReminders();

  const next = reminders.find((r) => r.enabled);
  if (!next) return null;

  const nextTime = getNextTime(next.times);
  if (!nextTime) return null;

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
          <span className={styles.time}>в {nextTime.time}</span>
        </div>
        <span className={styles.badge}>{nextTime.label}</span>
      </div>
    </Card>
  );
}
