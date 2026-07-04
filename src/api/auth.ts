export async function telegramLogin(): Promise<string> {
  let initData: string

  if (import.meta.env.DEV) {
    initData = 'dev'
  } else {
    const hash = window.location.hash.slice(1)
    const params = new URLSearchParams(hash)
    initData = params.get('tgWebAppData') ?? ''

    if (!initData) {
      throw new Error('Відкрийте додаток через Telegram')
    }
  }

  const token = localStorage.getItem('auth_token')
  const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: `initData=${encodeURIComponent(initData)}`,
  })

  if (!res.ok) throw new Error(`API error: ${res.status}`)

  const data = await res.json()
  localStorage.setItem('auth_token', data.token)
  return data.token
}