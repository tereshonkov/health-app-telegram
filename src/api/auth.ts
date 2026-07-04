import { retrieveRawInitData } from '@telegram-apps/bridge'
import { apiRequest } from './client'

export async function telegramLogin(): Promise<string> {
  let initData: string

  if (import.meta.env.DEV) {
    initData = 'dev'
  } else {
    initData = retrieveRawInitData() ?? ''

    if (!initData) {
      throw new Error('Відкрийте додаток через Telegram')
    }
  }

  const data = await apiRequest<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ initData }),
  })

  localStorage.setItem('auth_token', data.token)
  return data.token
}