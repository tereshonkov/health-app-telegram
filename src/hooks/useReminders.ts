import { useState, useCallback } from "react";
import {
  getReminders,
  addReminder,
  toggleReminder,
  deleteReminder,
} from "@store/reminders";
import type { Reminder } from "@/types";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(() => getReminders());

  const add = useCallback((data: Omit<Reminder, "id">) => {
    const r = addReminder(data);
    setReminders((prev) => [r, ...prev]);
    return r;
  }, []);

  const toggle = useCallback((id: string) => {
    toggleReminder(id);
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    deleteReminder(id);
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { reminders, add, toggle, remove };
}
