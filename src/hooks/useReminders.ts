import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchReminders,
  createReminder,
  deleteReminder,
  toggleReminder,
} from '@/api/reminders'
import type { Reminder } from '@/types'

export function useReminders() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: fetchReminders,
  })

  const reminders: Reminder[] = data?.data ?? []

  const addMutation = useMutation({
    mutationFn: createReminder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  })

  const removeMutation = useMutation({
    mutationFn: deleteReminder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  })

  const toggleMutation = useMutation({
    mutationFn: toggleReminder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  })

  return {
    reminders,
    isLoading,
    add: (data: Omit<Reminder, 'id'>) => addMutation.mutateAsync(data),
    remove: (id: string) => removeMutation.mutateAsync(id),
    toggle: (id: string) => toggleMutation.mutateAsync(id),
  }
}