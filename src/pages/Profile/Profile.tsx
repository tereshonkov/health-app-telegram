import { useTgUser } from "@hooks/useTgUser";
import { useMeasures } from "@hooks/useMeasures";
import { useReminders } from "@hooks/useReminders";
import Card from "@components/ui/Card/Card";
import Button from "@components/ui/Button/Button";
import styles from "./Profile.module.css";
import { exportPdf } from "@/api/pdf";

export default function Profile() {
  const { firstName, lastName } = useTgUser();
  const { measures, clear } = useMeasures();
  const { reminders } = useReminders();

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Профиль</h2>
      </div>

      {/* Аватар + имя */}
      <Card>
        <div className={styles.user}>
          <div className={styles.avatar}>{firstName?.[0] ?? "?"}</div>
          <div className={styles.info}>
            <span className={styles.name}>{fullName || "Пользователь"}</span>
            <span className={styles.sub}>Telegram аккаунт</span>
          </div>
        </div>
      </Card>

      {/* Статистика */}
      <Card>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={`${styles.statNum} mono`}>{measures.length}</span>
            <span className={styles.statLabel}>замеров</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={`${styles.statNum} mono`}>
              {reminders.filter((r) => r.enabled).length}
            </span>
            <span className={styles.statLabel}>напоминаний</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={`${styles.statNum} mono`}>
              {measures.length > 0
                ? Math.round(
                    measures.reduce((a, m) => a + (m.pulse ?? 0), 0) /
                      measures.length,
                  )
                : "—"}
            </span>
            <span className={styles.statLabel}>средний пульс</span>
          </div>
        </div>
      </Card>

      {/* PDF экспорт */}
      <Card>
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Экспорт для врача</span>
          <span className={styles.sectionSub}>
            Скачать историю замеров в PDF
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 14,
          }}
        >
          <Button onClick={() => exportPdf(30)}>Скачать PDF за месяц</Button>
          <Button variant="ghost" onClick={() => exportPdf(90)}>
            Скачать PDF за 3 месяца
          </Button>
        </div>
      </Card>

      {/* Опасная зона */}
      <Card>
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Данные</span>
        </div>
        <button
          className={styles.danger}
          onClick={async () => {
            if (confirm("Удалить все замеры?")) {
              await clear();
            }
          }}
        >
          Удалить все замеры
        </button>
      </Card>

      {/* Розробник */}
      <Card>
        <div className={styles.section}>
          {/* <span className={styles.sectionTitle}>Розробник</span> */}
          <span className={styles.sectionSub}>
            По всем вопросам и предложениям
          </span>
        </div>

        <a
          href="https://t.me/Dmitro90"
          style={{
            display: "block",
            marginTop: 12,
            color: "var(--primary)",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          @Dmitro90 в Telegram
        </a>
      </Card>
    </div>
  );
}
