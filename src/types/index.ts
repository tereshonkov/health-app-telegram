// Один замер (давление + пульс)
export interface Measure {
  id: string;
  date: string; // ISO string, например '2026-07-03T13:42:00.000Z'
  systolic: number; // верхнее давление
  diastolic: number; // нижнее давление
  pulse: number;
  note: string; // заметка к замеру (может быть пустой строкой)
}

// Статус замера (для бейджа)
export type MeasureStatus = "ok" | "warn" | "high" | "critical";

// Напоминание о таблетке
export interface Reminder {
  id: string;
  name: string; // название таблетки
  dose: string; // дозировка, например '10 мг'
  times: string[];
  enabled: boolean;
}

// Профиль пользователя
export interface Profile {
  id: string;
  name: string;
  avatar?: string;
}
