import { apiRequest } from "./client";
import type { Measure } from "@/types";

interface MeasuresResponse {
  data: Measure[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export async function fetchMeasures(
  page = 1,
  limit = 50,
  days?: number,
): Promise<MeasuresResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (days) params.append("days", String(days));
  return apiRequest(`/measures?${params}`);
}

export async function createMeasure(
  data: Omit<Measure, "id" | "date">,
): Promise<Measure> {
  return apiRequest("/measures", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteMeasure(id: string): Promise<void> {
  return apiRequest(`/measures/${id}`, {
    method: "DELETE",
  });
}

export async function clearMeasures(): Promise<void> {
  return apiRequest("/measures/clear", {
    method: "DELETE",
  });
}
