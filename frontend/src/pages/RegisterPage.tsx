import { Link } from 'react-router'
import { AuthCard } from '@/components/auth/AuthCard'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { PATHS } from '@/routes/paths'

export function RegisterPage() {
  return (
    <AuthCard
      title="Crear cuenta"
      description="Registrate para guardar tus paradas favoritas."
      footer={
        <p>
          ¿Ya tenés cuenta?{' '}
          <Link to={PATHS.login} className="font-medium text-foreground underline underline-offset-4">
            Ingresá
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthCard>
  )
}
