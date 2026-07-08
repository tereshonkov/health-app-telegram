import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMeasures,
  createMeasure,
  deleteMeasure,
  clearMeasures,
} from "@/api/measures";
import type { Measure } from "@/types";

export function useMeasures(days?: number) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["measures", days],
    queryFn: () => fetchMeasures(1, 50, days),
  });

  const measures: Measure[] = data?.data ?? [];
  const last = measures[0] ?? null;

  const addMutation = useMutation({
    mutationFn: createMeasure,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["measures"] }),
  });

  const removeMutation = useMutation({
    mutationFn: deleteMeasure,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["measures"] }),
  });

  const clearMutation = useMutation({
    mutationFn: clearMeasures,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["measures"] }),
  });

  return {
    measures,
    last,
    isLoading,
    add: (data: Omit<Measure, "id" | "date">) => addMutation.mutateAsync(data),
    remove: (id: string) => removeMutation.mutateAsync(id),
    clear: () => clearMutation.mutateAsync(),
  };
}
