import { useAuth } from '@/hooks/useAuth'
import AppRouter from './router/AppRouter'

export default function App() {
  const { isLoading, isError } = useAuth()

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        color: 'var(--text-secondary)',
        fontSize: 14,
      }}>
        Загрузка...
      </div>
    )
  }

  if (isError) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        color: 'var(--danger)',
        fontSize: 14,
      }}>
        Ошибка подключения
      </div>
    )
  }

  return <AppRouter />
}