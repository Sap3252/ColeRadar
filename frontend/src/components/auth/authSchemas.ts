import { z } from 'zod'

// Mismos límites que aplica Better Auth en el servidor.
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 128
const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 60

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Ingresá tu email')
  .pipe(z.email('Ingresá un email válido'))

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Ingresá tu contraseña'),
})

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(MIN_NAME_LENGTH, `El nombre debe tener al menos ${MIN_NAME_LENGTH} caracteres`)
      .max(MAX_NAME_LENGTH, `El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres`),
    email: emailSchema,
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`)
      .max(MAX_PASSWORD_LENGTH, `La contraseña no puede superar los ${MAX_PASSWORD_LENGTH} caracteres`),
    confirmPassword: z.string().min(1, 'Repetí la contraseña'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
