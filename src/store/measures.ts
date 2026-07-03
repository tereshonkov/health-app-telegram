import type { Measure, MeasureStatus } from "../types";

const KEY = "health_measures";

// Получить все замеры
export function getMeasures(): Measure[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Сохранить замер
export function addMeasure(data: Omit<Measure, "id" | "date">): Measure {
  const measure: Measure = {
    ...data,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  const all = getMeasures();
  localStorage.setItem(KEY, JSON.stringify([measure, ...all]));
  return measure;
}

// Удалить замер
export function deleteMeasure(id: string): void {
  const all = getMeasures().filter((m) => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

// Определить статус замера
export function getMeasureStatus(m: Measure): MeasureStatus {
  if (m.systolic >= 180 || m.diastolic >= 110 || m.pulse >= 130)
    return "critical";
  if (m.systolic >= 140 || m.diastolic >= 90 || m.pulse >= 100) return "high";
  if (m.systolic >= 130 || m.diastolic >= 85 || m.pulse >= 90) return "warn";
  return "ok";
}

// Последний замер
export function getLastMeasure(): Measure | null {
  const all = getMeasures();
  return all.length > 0 ? all[0] : null;
}
