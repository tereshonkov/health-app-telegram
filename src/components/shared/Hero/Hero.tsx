import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";
import HeroValues from "./HeroValues";
import HeroEcg from "./HeroEcg";
import { getMeasureStatus } from "@store/measures";
import type { Measure } from "@/types";
import styles from "./Hero.module.css";

interface Props {
  measure: Measure | null;
}

export default function HeroCard({ measure }: Props) {
  if (!measure) {
    return (
      <Card hero>
        <p className={styles.empty}>
          Замеров пока нет.
          <br />
          Добавьте первый!
        </p>
      </Card>
    );
  }

  const status = getMeasureStatus(measure);
  const time = new Date(measure.date).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card hero>
      <div className={styles.header}>
        <span className={`${styles.label} mono`}>ПОСЛЕДНИЙ ЗАМЕР</span>
        <Badge status={status} />
      </div>

      <HeroValues measure={measure} />
      <HeroEcg />

      {getMeasureStatus(measure) === "critical" && (
        <div
          style={{
            marginTop: 10,
            padding: "10px 14px",
            background: "rgba(224,80,80,0.15)",
            border: "1px solid rgba(224,80,80,0.3)",
            borderRadius: 12,
            fontSize: 13,
            color: "var(--danger)",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          ⚠️ Срочно обратитесь к врачу!
        </div>
      )}

      <span className={`${styles.time} mono`}>сегодня · {time}</span>
    </Card>
  );
}
