import type { Role } from '@coleradar/shared'
import { Navigate, Outlet, useLocation } from 'react-router'
import { LoadingIndicator } from '@/components/feedback/LoadingIndicator'
import { authClient } from '@/services/authClient'
import { PATHS } from './paths'

interface ProtectedRouteProps {
  requiredRole?: Role
}

/** Ruta de layout: sin sesión manda al login y, si falta el rol, vuelve al inicio. */
export function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { data: session, isPending } = authClient.useSession()
  const location = useLocation()

  if (isPending) return <LoadingIndicator message="Verificando sesión…" />

  // Se guarda la ruta pedida para volver a ella después de iniciar sesión.
  if (!session) return <Navigate to={PATHS.login} replace state={{ from: location }} />

  if (requiredRole && session.user.role !== requiredRole) return <Navigate to={PATHS.home} replace />

  return <Outlet />
}
