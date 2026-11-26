import { z } from 'zod'

/** Rectángulo que contiene a Rosario; fuera de él una coordenada se considera inválida. */
export const ROSARIO_BOUNDS = {
  minLat: -33.1,
  maxLat: -32.8,
  minLng: -60.85,
  maxLng: -60.55,
} as const

const OUTSIDE_ROSARIO_MESSAGE = 'La ubicación debe estar dentro de Rosario'

export const latitudeSchema = z.coerce
  .number({ error: 'La latitud debe ser un número' })
  .min(ROSARIO_BOUNDS.minLat, OUTSIDE_ROSARIO_MESSAGE)
  .max(ROSARIO_BOUNDS.maxLat, OUTSIDE_ROSARIO_MESSAGE)

export const longitudeSchema = z.coerce
  .number({ error: 'La longitud debe ser un número' })
  .min(ROSARIO_BOUNDS.minLng, OUTSIDE_ROSARIO_MESSAGE)
  .max(ROSARIO_BOUNDS.maxLng, OUTSIDE_ROSARIO_MESSAGE)

export const coordinatesSchema = z.object({
  lat: latitudeSchema,
  lng: longitudeSchema,
})

export type Coordinates = z.infer<typeof coordinatesSchema>
