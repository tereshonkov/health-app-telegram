import { apiRequest } from './client'
import type { Reminder } from '@/types'

interface RemindersResponse {
  data: Reminder[]
  meta: {
    current_page: number
    last_page: number
    total: number
  }
}

export async function fetchReminders(): Promise<RemindersResponse> {
  return apiRequest('/reminders')
}

export async function createReminder(data: Omit<Reminder, 'id'>): Promise<Reminder> {
  return apiRequest('/reminders', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function deleteReminder(id: string): Promise<void> {
  return apiRequest(`/reminders/${id}`, {
    method: 'DELETE',
  })
}

export async function toggleReminder(id: string): Promise<Reminder> {
  return apiRequest(`/reminders/${id}/toggle`, {
    method: 'PATCH',
  })
}