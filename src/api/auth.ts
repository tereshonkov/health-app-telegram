import { apiRequest } from './client'

export async function telegramLogin(): Promise<string> {
  let initData: string

  if (import.meta.env.DEV) {
    initData = 'dev'
  } else {
    // Спробуємо всі джерела
    const fromWebApp = window.Telegram?.WebApp?.initData ?? ''
    const fromHash = window.location.hash.slice(1)
    const fromSearch = window.location.search.slice(1)

    throw new Error(`WebApp: "${fromWebApp}" | hash: "${fromHash}" | search: "${fromSearch}"`)
  }

  const data = await apiRequest<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ initData }),
  })

  localStorage.setItem('auth_token', data.token)
  return data.token
}