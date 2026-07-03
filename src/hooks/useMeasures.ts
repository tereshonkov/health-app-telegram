import { useState, useCallback } from "react";
import {
  getMeasures,
  addMeasure,
  deleteMeasure,
  getLastMeasure,
} from "../store/measures";
import type { Measure } from "../types";

export function useMeasures() {
  const [measures, setMeasures] = useState<Measure[]>(() => getMeasures());

  const add = useCallback((data: Omit<Measure, "id" | "date">) => {
    const m = addMeasure(data);
    setMeasures((prev) => [m, ...prev]);
    return m;
  }, []);

  const remove = useCallback((id: string) => {
    deleteMeasure(id);
    setMeasures((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const last = measures[0] ?? null;

  return { measures, add, remove, last };
}
