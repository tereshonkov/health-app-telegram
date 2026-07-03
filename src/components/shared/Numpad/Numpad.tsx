import styles from "./Numpad.module.css";
import { hapticFeedback } from "@telegram-apps/sdk-react";

interface Props {
  onKey: (key: string) => void;
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

function triggerHaptic(key: string) {
  try {
    if (!hapticFeedback.isSupported()) return;
    if (key === "⌫") {
      hapticFeedback.impactOccurred("light");
    } else {
      hapticFeedback.impactOccurred("light");
    }
  } catch {
    // вне Telegram — просто игнорируем
  }
}

export default function Numpad({ onKey }: Props) {
  function handleClick(key: string) {
    if (!key) return;
    triggerHaptic(key);
    onKey(key);
  }
  return (
    <div className={styles.grid}>
      {KEYS.map((key, i) => (
        <button
          key={i}
          className={`${styles.key} ${key === "⌫" ? styles.del : ""} ${key === "" ? styles.empty : ""}`}
          onClick={() => handleClick(key)}
          disabled={key === ""}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
