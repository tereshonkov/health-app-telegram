import type { Reminder } from "@/types";

const KEY = "health_reminders";

export function getReminders(): Reminder[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addReminder(data: Omit<Reminder, "id">): Reminder {
  const reminder: Reminder = {
    ...data,
    id: crypto.randomUUID(),
  };
  const all = getReminders();
  localStorage.setItem(KEY, JSON.stringify([reminder, ...all]));
  return reminder;
}

export function toggleReminder(id: string): void {
  const all = getReminders().map((r) =>
    r.id === id ? { ...r, enabled: !r.enabled } : r,
  );
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deleteReminder(id: string): void {
  const all = getReminders().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}
