import { useMemo } from "react";
import type { Measure } from "@/types";
import Card from "@components/ui/Card/Card";
import styles from "./TrendChart.module.css";

interface Props {
  measures: Measure[];
}

export default function TrendChart({ measures }: Props) {
  const week = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    const from = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return measures
      .filter((m) => new Date(m.date).getTime() >= from)
      .slice(0, 7)
      .reverse();
  }, [measures]);

  if (week.length < 2) return null;

  const W = 340;
  const H = 52;

  function toY(val: number, min: number, max: number) {
    if (max === min) return H / 2;
    return H - ((val - min) / (max - min)) * (H - 10) - 5;
  }

  // 1. Фільтруємо масиви від null та явно вказуємо TypeScript, що тепер тут тільки number[]
  const systolicVals = week.map((m) => m.systolic).filter((v): v is number => v !== null);
  const diastolicVals = week.map((m) => m.diastolic).filter((v): v is number => v !== null);
  
  const allVals = [...systolicVals, ...diastolicVals];
  
  // Якщо раптом усі значення виявилися null (масив порожній), задаємо дефолтні межі
  const min = allVals.length > 0 ? Math.min(...allVals) : 60;
  const max = allVals.length > 0 ? Math.max(...allVals) : 120;

  // 2. Тепер параметр `vals` має чистий тип number[] і TypeScript задоволений
  function toPoints(vals: number[]) {
    return vals
      .map((v, i) => {
        const x = (i / (vals.length - 1)) * (W - 20) + 10;
        const y = toY(v, min, max);
        return `${x},${y}`;
      })
      .join(" ");
  }

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <Card>
      <div className={styles.header}>
        <span className={styles.title}>Тренд за неделю</span>
        <span className={styles.link}>История ›</span>
      </div>

      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        {/* Малюємо лінію лише якщо є бодай якісь дані */}
        {systolicVals.length > 0 && (
          <polyline
            points={toPoints(systolicVals)}
            fill="none"
            stroke="var(--health)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {diastolicVals.length > 0 && (
          <polyline
            points={toPoints(diastolicVals)}
            fill="none"
            stroke="var(--ok)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        )}
      </svg>

      <div className={`${styles.labels} mono`}>
        {week.map((m, i) => (
          <span key={i}>
            {
              days[
                new Date(m.date).getDay() === 0
                  ? 6
                  : new Date(m.date).getDay() - 1
              ]
            }
          </span>
        ))}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span
            className={styles.line}
            style={{ background: "var(--health)" }}
          />
          Систол.
        </span>
        <span className={styles.legendItem}>
          <span className={styles.line} style={{ background: "var(--ok)" }} />
          Диастол.
        </span>
      </div>
    </Card>
  );
}