import { useAddMeasure } from "@/hooks/useAddMesure";
import Numpad from "@components/shared/Numpad/Numpad";
import Button from "@components/ui/Button/Button";
import styles from "./Add.module.css";

export default function Add() {
  const {
    fields,
    values,
    active,
    note,
    activeField,
    setActive,
    setNote,
    handleKey,
    handleSave,
  } = useAddMeasure();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => history.back()}>
          <svg width="10" height="16" viewBox="0 0 10 16">
            <path
              d="M8 2L2 8l6 6"
              stroke="var(--text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
        <h2 className={styles.title}>Новый замер</h2>
        <div style={{ width: 34 }} />
      </div>

      <div className={styles.tabs}>
        {fields.map((f) => (
          <button
            key={f.key}
            className={`${styles.tab} ${active === f.key ? styles.tabActive : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.display}>
        <span className={styles.bigNum}>{values[active] || "—"}</span>
        <span className={styles.unit}>{activeField?.unit}</span>
      </div>

      <Numpad onKey={handleKey} />

      <textarea
        className={styles.note}
        placeholder="Заметка (самочувствие, обстоятельства...)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
      />

      <Button onClick={handleSave}>Сохранить</Button>
    </div>
  );
}
