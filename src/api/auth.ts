import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import { apiRequest } from './client'

export async function telegramLogin(): Promise<string> {
  let initData: string

  if (import.meta.env.DEV) {
    initData = 'dev'
  } else {
    try {
      const lp = retrieveLaunchParams()
      const raw = String(lp.initDataRaw ?? '')
      
      // Тимчасово для дебагу
      throw new Error(`initDataRaw: "${raw}" | tgWebAppData: ${JSON.stringify(lp.tgWebAppData)}`)
      
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