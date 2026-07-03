import { useState, useMemo } from "react";
import { useMeasures } from "@hooks/useMeasures";
import HistoryRow from "@components/shared/HistoryRow/HistoryRow";
import Card from "@components/ui/Card/Card";
import styles from "./History.module.css";
import TrendChart from "@/components/shared/TrendChart/TrendChart";

type Period = "7" | "30" | "90";

const PERIODS: { key: Period; label: string }[] = [
  { key: "7", label: "7 дней" },
  { key: "30", label: "1 месяц" },
  { key: "90", label: "3 месяца" },
];

export default function History() {
  const { measures, remove } = useMeasures();
  const [period, setPeriod] = useState<Period>("30");

  const filtered = useMemo(() => {
    const days = Number(period);
    // eslint-disable-next-line react-hooks/purity
    const from = Date.now() - days * 24 * 60 * 60 * 1000;
    return measures.filter((m) => new Date(m.date).getTime() >= from);
  }, [measures, period]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>История</h2>
        <span className={styles.count}>{filtered.length} замеров</span>
      </div>

      {/* Фильтр периода */}
      <div className={styles.seg}>
        {PERIODS.map((p) => (
          <button
            key={p.key}
            className={`${styles.segItem} ${period === p.key ? styles.segActive : ""}`}
            onClick={() => setPeriod(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Список */}
      {filtered.length === 0 ? (
        <Card>
          <p className={styles.empty}>За этот период замеров нет</p>
        </Card>
      ) : (
        <Card padding="6px 18px">
          {filtered.map((m) => (
            <HistoryRow key={m.id} measure={m} onDelete={remove} />
          ))}
        </Card>
      )}
    </div>
  );
}
