import { Link } from 'react-router'
import { AuthCard } from '@/components/auth/AuthCard'
import { LoginForm } from '@/components/auth/LoginForm'
import { PATHS } from '@/routes/paths'

export function LoginPage() {
  return (
    <AuthCard
      title="Ingresar"
      description="Entrá con tu email y contraseña."
      footer={
        <p>
          ¿No tenés cuenta?{' '}
          <Link to={PATHS.register} className="font-medium text-foreground underline underline-offset-4">
            Registrate
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  )
}
