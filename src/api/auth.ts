import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import { apiRequest } from './client'

export async function telegramLogin(): Promise<string> {
  let initData: string

  if (import.meta.env.DEV) {
    initData = 'dev'
  } else {
    try {
      const lp = retrieveLaunchParams()
      throw new Error(`raw: "${String(lp.initDataRaw)}" | keys: ${Object.keys(lp).join(',')}`)
    } catch (e) {
      throw e
    }
  }

  const data = await apiRequest<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ initData }),
  })

  localStorage.setItem('auth_token', data.token)
  return data.token
}