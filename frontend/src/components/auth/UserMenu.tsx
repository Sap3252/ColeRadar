import { ADMIN_ROLE } from '@coleradar/shared'
import { LogOut, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAuthSession } from '@/hooks/useAuthSession'
import { PATHS } from '@/routes/paths'
import { authClient } from '@/services/authClient'

export function UserMenu() {
  const { session, isLoading } = useAuthSession()
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)

  // Mientras se verifica la sesión no se muestra nada, para no parpadear entre "Ingresar" y el usuario.
  if (isLoading) return null

  if (!session) {
    return (
      <Button asChild size="sm" className="ml-1">
        <Link to={PATHS.login}>Ingresar</Link>
      </Button>
    )
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    // Se va al inicio antes de cerrar la sesión: desde una ruta privada, la ruta protegida
    // reaccionaría primero y mandaría al login en lugar de al inicio.
    navigate(PATHS.home, { replace: true })
    const { error } = await authClient.signOut()
    setIsSigningOut(false)
    if (error) toast.error('No pudimos cerrar la sesión. Probá de nuevo.')
  }

  return (
    <div className="ml-1 flex items-center gap-1">
      {session.user.role === ADMIN_ROLE && (
        <Button asChild variant="ghost" size="sm">
          <Link to={PATHS.admin}>
            <ShieldCheck aria-hidden />
            Admin
          </Link>
        </Button>
      )}
      <span className="hidden max-w-32 truncate px-2 text-sm text-muted-foreground sm:inline">
        {session.user.name}
      </span>
      <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isSigningOut}>
        <LogOut aria-hidden />
        Salir
      </Button>
    </div>
  )
}
