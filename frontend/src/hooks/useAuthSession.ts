import { authClient } from '@/services/authClient'

export function useAuthSession() {
  const { data: session, isPending } = authClient.useSession()

  return { session, isLoading: isPending }
}
