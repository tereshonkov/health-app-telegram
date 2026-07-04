const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

export async function exportPdf(days: 30 | 90): Promise<void> {
  const token = localStorage.getItem('auth_token')

  const res = await fetch(`${BASE_URL}/export/pdf?days=${days}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error('PDF export failed')

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `health-report-${days}d.pdf`
  a.click()
  URL.revokeObjectURL(url)
}