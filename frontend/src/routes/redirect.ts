import { z } from 'zod'
import { PATHS } from './paths'

const redirectStateSchema = z.object({
  from: z.object({ pathname: z.string() }),
})

/** Ruta a la que volver después de iniciar sesión: la que se pidió antes del login, o el inicio. */
export function getPostLoginPath(locationState: unknown): string {
  const parsed = redirectStateSchema.safeParse(locationState)
  if (!parsed.success) return PATHS.home

  return parsed.data.from.pathname
}
