import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeasures } from "@hooks/useMeasures";
import { hapticFeedback } from "@telegram-apps/sdk-react";

export type Field = "systolic" | "diastolic" | "pulse";

export const FIELDS: { key: Field; label: string; unit: string }[] = [
  { key: "systolic", label: "Верхнее", unit: "мм рт. ст." },
  { key: "diastolic", label: "Нижнее", unit: "мм рт. ст." },
  { key: "pulse", label: "Пульс", unit: "уд/мин" },
];

export function useAddMeasure() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { add } = useMeasures();

  const isPulseOnly = searchParams.get("type") === "pulse";
  const fields = isPulseOnly ? FIELDS.filter((f) => f.key === "pulse") : FIELDS;

  const [values, setValues] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
  });
  const [active, setActive] = useState<Field>(
    isPulseOnly ? "pulse" : "systolic",
  );
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  function handleKey(key: string) {
    setErrors((prev) => ({ ...prev, [active]: "" }));
    setValues((prev) => {
      const cur = prev[active];
      if (key === "⌫") return { ...prev, [active]: cur.slice(0, -1) };
      if (cur.length >= 3) return prev;
      return { ...prev, [active]: cur + key };
    });
  }

  async function handleSave() {
    const s = Number(values.systolic) || 0;
    const d = Number(values.diastolic) || 0;
    const p = Number(values.pulse) || 0;

    const newErrors: Partial<Record<Field, string>> = {};

    if (isPulseOnly) {
      if (!p) newErrors.pulse = "Введіть пульс";
    } else {
      if (!s) newErrors.systolic = "Введіть верхнє";
      if (!d) newErrors.diastolic = "Введіть нижнє";
      if (!p) newErrors.pulse = "Введіть пульс";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      try {
        if (hapticFeedback.isSupported()) {
          hapticFeedback.notificationOccurred("error");
        }
      } catch (error) {
        console.error("Haptic feedback error:", error);
      }
      // Переключаємо на перше поле з помилкою
      const firstError = fields.find((f) => newErrors[f.key]);
      if (firstError) setActive(firstError.key);
      return;
    }

    try {
      await add({
        systolic: s || null,
        diastolic: d || null,
        pulse: p || null,
        note,
      });
      navigate("/");
    } catch (e) {
      console.error("Save failed:", e);
    }
  }

  const activeField = fields.find((f) => f.key === active);

  return {
    fields,
    values,
    active,
    note,
    activeField,
    errors,
    setActive,
    setNote,
    handleKey,
    handleSave,
  };
}
