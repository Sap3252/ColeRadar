import { authClient } from '@/services/authClient'

export function useAuthSession() {
  const { data: session, isPending, isRefetching } = authClient.useSession()

  // Al iniciar sesión la sesión se vuelve a pedir: sin esperar ese pedido, una ruta protegida
  // vería por un instante la sesión vieja (vacía) y mandaría de nuevo al login.
  const isLoading = isPending || (isRefetching && !session)

  return { session, isLoading }
}
