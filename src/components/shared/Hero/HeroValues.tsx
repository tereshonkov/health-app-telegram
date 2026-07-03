import type { Measure } from "@/types";
import styles from "./Hero.module.css";

interface Props {
  measure: Measure;
}

export default function HeroValues({ measure }: Props) {
  return (
    <div className={styles.values}>
      <div className={styles.col}>
        <span className={`${styles.label} mono`}>ДАВЛЕНИЕ</span>
        <div className={styles.bigNum}>
          {measure.systolic}
          <span className={styles.sep}>/</span>
          {measure.diastolic}
        </div>
        <span className={styles.unit}>мм рт. ст.</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.col}>
        <span className={`${styles.label} mono`}>ПУЛЬС</span>
        <div className={styles.pulseRow}>
          <svg width="17" height="16" viewBox="0 0 24 21">
            <path
              d="M12 20C6 15.5 3 11.6 3 8.5 3 6 5 4 7.5 4c1.7 0 3 .8 4.5 2.5C13.5 4.8 14.8 4 16.5 4 19 4 21 6 21 8.5c0 3.1-3 7-9 11.5z"
              fill="var(--health)"
            />
          </svg>
          <span className={styles.bigNum}>{measure.pulse}</span>
        </div>
        <span className={styles.unit}>уд/мин</span>
      </div>
    </div>
  );
}
