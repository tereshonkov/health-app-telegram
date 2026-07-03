import { useState } from "react";
import type { Reminder } from "@/types";
import Card from "@components/ui/Card/Card";
import Button from "@components/ui/Button/Button";
import styles from "./AddRemindersForm.module.css";

const TIMES = ["08:00", "12:00", "18:00", "21:00"];
const UNITS = ["мг", "мл", "шт"];

interface Props {
  onSave: (data: Omit<Reminder, "id">) => void;
  onCancel: () => void;
}

export default function AddReminderForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [unit, setUnit] = useState("мг");
  const [times, setTimes] = useState<string[]>(["08:00"]);

  function toggleTime(t: string) {
    setTimes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  function handleSave() {
    if (!name || !dose || times.length === 0) return;
    onSave({ name, dose: `${dose} ${unit}`, times, enabled: true });
  }

  return (
    <Card>
      <div className={styles.form}>
        <div className={styles.row}>
          <span className={styles.label}>НАЗВАНИЕ</span>
          <input
            className={styles.input}
            placeholder="Например: Лизиноприл"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.doseRow}>
          <div style={{ flex: 1 }}>
            <span className={styles.label}>ДОЗИРОВКА</span>
            <input
              className={`${styles.input} ${styles.mono}`}
              placeholder="10"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />
          </div>
          <div>
            <span className={styles.label}>ЕДИНИЦА</span>
            <div className={styles.units}>
              {UNITS.map((u) => (
                <button
                  key={u}
                  className={`${styles.unit} ${unit === u ? styles.unitActive : ""}`}
                  onClick={() => setUnit(u)}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <span className={styles.label}>ВРЕМЯ ПРИЁМА</span>
          <div className={styles.times}>
            {TIMES.map((t) => (
              <button
                key={t}
                className={`${styles.chip} ${times.includes(t) ? styles.chipActive : ""}`}
                onClick={() => toggleTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.btns}>
          <Button onClick={handleSave}>Сохранить</Button>
          <Button variant="ghost" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </Card>
  );
}
