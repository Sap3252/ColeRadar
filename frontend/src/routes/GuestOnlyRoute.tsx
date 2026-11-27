import { Navigate, Outlet, useLocation } from 'react-router'
import { LoadingIndicator } from '@/components/feedback/LoadingIndicator'
import { useAuthSession } from '@/hooks/useAuthSession'
import { getPostLoginPath } from './redirect'

/**
 * Ruta de layout para login y registro. Al llegar la sesión manda a la ruta que se había pedido.
 * La redirección vive acá y no en los formularios: si el formulario navegara apenas responde el
 * servidor, la ruta protegida todavía vería la sesión vieja y devolvería al usuario al login.
 */
export function GuestOnlyRoute() {
  const { session, isLoading } = useAuthSession()
  const location = useLocation()

  if (isLoading) return <LoadingIndicator />
  if (session) return <Navigate to={getPostLoginPath(location.state)} replace />

  return <Outlet />
}
