import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormErrorAlert } from '@/components/feedback/FormErrorAlert'
import { SubmitButton } from '@/components/forms/SubmitButton'
import { TextField } from '@/components/forms/TextField'
import { FieldGroup } from '@/components/ui/field'
import { authClient } from '@/services/authClient'
import { getAuthErrorMessage } from './authErrors'
import { loginSchema, type LoginValues } from './authSchemas'

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  // Si sale bien no se navega acá: GuestOnlyRoute redirige cuando llega la sesión nueva.
  const onSubmit = async (values: LoginValues) => {
    setServerError(null)
    const { error } = await authClient.signIn.email(values)
    if (error) setServerError(getAuthErrorMessage(error))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        {serverError && <FormErrorAlert message={serverError} />}
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
          autoComplete="current-password"
          registration={register('password')}
          error={errors.password}
        />
        <SubmitButton isSubmitting={isSubmitting}>Ingresar</SubmitButton>
      </FieldGroup>
    </form>
  )
}
