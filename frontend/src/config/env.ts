import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url('VITE_API_URL debe ser la URL del backend, por ejemplo http://localhost:3000'),
})

// Falla al arrancar si falta una variable, en lugar de romper más tarde en un pedido.
const parsedEnv = envSchema.parse(import.meta.env)

export const env = {
  apiUrl: parsedEnv.VITE_API_URL,
} as const
