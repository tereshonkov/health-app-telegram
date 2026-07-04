import { useAuth } from '@hooks/useAuth'
import AppRouter from './router/AppRouter'
import { useState, useEffect } from 'react'

export default function App() {
  const { isLoading, isError, error } = useAuth()

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
        padding: 16,
        minHeight: '100dvh',
        background: '#0B0D11',
        color: '#E05050',
        fontSize: 12,
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      }}>
        <div style={{ fontSize: 16, marginBottom: 12 }}>❌ Помилка підключення</div>
        <div>{String(error)}</div>
        <div style={{ marginTop: 12, color: '#9AA1AE' }}>
          API: {import.meta.env.VITE_API_URL}
        </div>
      </div>
    )
  }

  return <AppRouter />
}