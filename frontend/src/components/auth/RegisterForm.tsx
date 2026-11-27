import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormErrorAlert } from '@/components/feedback/FormErrorAlert'
import { SubmitButton } from '@/components/forms/SubmitButton'
import { TextField } from '@/components/forms/TextField'
import { FieldGroup } from '@/components/ui/field'
import { authClient } from '@/services/authClient'
import { getAuthErrorMessage } from './authErrors'
import { MIN_PASSWORD_LENGTH, registerSchema, type RegisterValues } from './authSchemas'

export function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  // Better Auth inicia la sesión al registrarse; GuestOnlyRoute redirige cuando llega la sesión nueva.
  const onSubmit = async ({ name, email, password }: RegisterValues) => {
    setServerError(null)
    const { error } = await authClient.signUp.email({ name, email, password })
    if (error) setServerError(getAuthErrorMessage(error))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        {serverError && <FormErrorAlert message={serverError} />}
        <TextField
          id="name"
          label="Nombre"
          autoComplete="name"
          registration={register('name')}
          error={errors.name}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="nombre@ejemplo.com"
          registration={register('email')}
          error={errors.email}
        />
        <TextField
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          placeholder={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`}
          registration={register('password')}
          error={errors.password}
        />
        <TextField
          id="confirmPassword"
          label="Repetir contraseña"
          type="password"
          autoComplete="new-password"
          registration={register('confirmPassword')}
          error={errors.confirmPassword}
        />
        <SubmitButton isSubmitting={isSubmitting}>Crear cuenta</SubmitButton>
      </FieldGroup>
    </form>
  )
}
