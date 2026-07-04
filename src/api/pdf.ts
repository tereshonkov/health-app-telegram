import { apiRequest } from './client'

export async function exportPdf(days: 30 | 90): Promise<void> {
  await apiRequest(`/export/pdf?days=${days}`)
  alert('📊 PDF надіслано в чат з ботом @margoheal_bot')
}