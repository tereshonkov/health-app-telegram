import styles from "./Numpad.module.css";

interface Props {
  onKey: (key: string) => void;
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

export default function Numpad({ onKey }: Props) {
  return (
    <div className={styles.grid}>
      {KEYS.map((key, i) => (
        <button
          key={i}
          className={`${styles.key} ${key === "⌫" ? styles.del : ""} ${key === "" ? styles.empty : ""}`}
          onClick={() => key && onKey(key)}
          disabled={key === ""}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
