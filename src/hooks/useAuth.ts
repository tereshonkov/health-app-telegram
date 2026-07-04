import { useQuery } from '@tanstack/react-query'
import { telegramLogin } from '@/api/auth'

export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: telegramLogin,
    staleTime: Infinity,
    retry: 2,
  })
}