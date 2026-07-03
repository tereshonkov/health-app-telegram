import styles from "./Hero.module.css";

export default function HeroEcg() {
  return (
    <svg
      width="100%"
      height="36"
      viewBox="0 0 340 36"
      preserveAspectRatio="none"
      className={styles.ecg}
    >
      <polyline
        points="0,18 28,18 44,18 56,5 66,30 76,14 98,18 128,18 150,18 160,4 170,31 180,18 216,18 236,18 246,7 258,32 270,18 340,18"
        fill="none"
        stroke="var(--health)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
