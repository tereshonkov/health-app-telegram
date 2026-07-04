export function useTgUser() {
  try {
    const raw = localStorage.getItem('tg_user')
    if (raw) {
      const user = JSON.parse(raw)
      return {
        firstName: String(user.first_name ?? ''),
        lastName: String(user.last_name ?? ''),
        id: user.id ?? null,
      }
    }
  } catch {}

  return { firstName: '', lastName: '', id: null }
}
