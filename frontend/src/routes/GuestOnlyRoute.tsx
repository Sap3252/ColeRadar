import { Navigate, Outlet } from 'react-router'
import { LoadingIndicator } from '@/components/feedback/LoadingIndicator'
import { useAuthSession } from '@/hooks/useAuthSession'
import { PATHS } from './paths'

/** Ruta de layout para login y registro: quien ya tiene sesión vuelve al inicio. */
export function GuestOnlyRoute() {
  const { session, isLoading } = useAuthSession()

  if (isLoading) return <LoadingIndicator />
  if (session) return <Navigate to={PATHS.home} replace />

  return <Outlet />
}
