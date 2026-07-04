import { apiRequest } from './client'

export async function telegramLogin(): Promise<string> {
  const initData = import.meta.env.DEV
    ? 'dev'
    : window.Telegram?.WebApp?.initData ?? ''

  const data = await apiRequest<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ initData }),
  })

  localStorage.setItem('auth_token', data.token)
  return data.token
}