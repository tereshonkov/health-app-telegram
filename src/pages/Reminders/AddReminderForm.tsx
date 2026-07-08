import { useState } from "react";
import type { Reminder } from "@/types";
import Card from "@components/ui/Card/Card";
import Button from "@components/ui/Button/Button";
import styles from "./AddRemindersForm.module.css";

const UNITS = ["мг", "мл", "шт"];

interface Props {
  onSave: (data: Omit<Reminder, "id">) => void;
  onCancel: () => void;
}

export default function AddReminderForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [unit, setUnit] = useState("мг");
  const [times, setTimes] = useState<string[]>([]);
  const [timeInput, setTimeInput] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    dose: false,
    times: false,
  });

  function addTime() {
    if (timeInput && !times.includes(timeInput)) {
      setTimes((prev) => [...prev, timeInput].sort());
      setErrors((prev) => ({ ...prev, times: false }));
    }
  }

  function removeTime(t: string) {
    setTimes((prev) => prev.filter((x) => x !== t));
  }

  function handleSave() {
    const finalTimes =
      timeInput && !times.includes(timeInput)
        ? [...times, timeInput].sort()
        : times;

    const newErrors = {
      name: !name,
      dose: !dose,
      times: finalTimes.length === 0 && !timeInput,
    };

    if (newErrors.name || newErrors.dose || newErrors.times) {
      setErrors(newErrors);
      return;
    }

    onSave({ name, dose: `${dose} ${unit}`, times: finalTimes, enabled: true });
  }

  const hasErrors = errors.name || errors.dose || errors.times;

  return (
    <Card>
      <div className={styles.form}>
        <div className={styles.row}>
          <span className={styles.label}>НАЗВАНИЕ</span>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            placeholder="Например: Лизиноприл"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: false }));
            }}
          />
          {errors.name && <p className={styles.fieldError}>Введите название</p>}
        </div>

        <div className={styles.doseRow}>
          <div style={{ flex: 1 }}>
            <span className={styles.label}>ДОЗИРОВКА</span>
            <input
              className={`${styles.input} ${styles.mono} ${errors.dose ? styles.inputError : ""}`}
              placeholder="10"
              value={dose}
              onChange={(e) => {
                setDose(e.target.value);
                setErrors((prev) => ({ ...prev, dose: false }));
              }}
            />
            {errors.dose && (
              <p className={styles.fieldError}>Введите дозировку</p>
            )}
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
          <div className={styles.timeAdder}>
            <input
              type="time"
              className={`${styles.timeInput} ${errors.times ? styles.inputError : ""}`}
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
            />
            <button className={styles.addTime} onClick={addTime}>
              + Добавить
            </button>
          </div>
          <div className={styles.times}>
            {times.map((t) => (
              <button
                key={t}
                className={styles.chip}
                onClick={() => removeTime(t)}
              >
                {t} ✕
              </button>
            ))}
          </div>
          {errors.times && (
            <p className={styles.fieldError}>Добавьте хотя бы одно время</p>
          )}
        </div>

        <div className={styles.btns}>
          <Button
            onClick={handleSave}
            variant={hasErrors ? "danger" : "primary"}
          >
            Сохранить
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </Card>
  );
}
