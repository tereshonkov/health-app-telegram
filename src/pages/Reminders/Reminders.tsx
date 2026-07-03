import { useState } from "react";
import { useReminders } from "@hooks/useReminders";
import ReminderRow from "@components/shared/ReminderRow/ReminderRow";
import Card from "@components/ui/Card/Card";
import Button from "@components/ui/Button/Button";
import AddReminderForm from "./AddReminderForm";
import styles from "./Reminders.module.css";

export default function Reminders() {
  const { reminders, add, toggle, remove } = useReminders();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Напоминания</h2>
      </div>

      {reminders.length > 0 && (
        <Card padding="6px 18px">
          {reminders.map((r) => (
            <ReminderRow
              key={r.id}
              reminder={r}
              onToggle={toggle}
              onDelete={remove}
            />
          ))}
        </Card>
      )}

      {showForm ? (
        <AddReminderForm
          onSave={(data) => {
            add(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <Button onClick={() => setShowForm(true)}>
          + Добавить напоминание
        </Button>
      )}
    </div>
  );
}
