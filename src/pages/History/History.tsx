import { useState } from "react";
import { useMeasures } from "@hooks/useMeasures";
import HistoryRow from "@components/shared/HistoryRow/HistoryRow";
import Card from "@components/ui/Card/Card";
import TrendChart from "@components/shared/TrendChart/TrendChart";
import styles from "./History.module.css";

type Period = "7" | "30" | "90";

const PERIODS: { key: Period; label: string }[] = [
  { key: "7", label: "7 дней" },
  { key: "30", label: "1 месяц" },
  { key: "90", label: "3 месяца" },
];

export default function History() {
  const [period, setPeriod] = useState<Period>("30");
  const { measures, remove, isLoading } = useMeasures(Number(period));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>История</h2>
        <span className={styles.count}>{measures.length} замеров</span>
      </div>

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

      {isLoading ? (
        <Card>
          <p className={styles.empty}>Загрузка...</p>
        </Card>
      ) : measures.length === 0 ? (
        <Card>
          <p className={styles.empty}>За этот период замеров нет</p>
        </Card>
      ) : (
        <>
          {measures.length >= 3 && period !== "7" && (
            <TrendChart measures={measures} />
          )}
          <Card padding="6px 18px">
            {measures.map((m) => (
              <HistoryRow key={m.id} measure={m} onDelete={remove} />
            ))}
          </Card>
        </>
      )}
    </div>
  );
}
