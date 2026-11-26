import { z } from 'zod'
import { latitudeSchema, longitudeSchema } from './location.js'

export const PLACE_CATEGORIES = [
  'salud',
  'educacion',
  'transporte',
  'cultura',
  'deporte',
  'gobierno',
  'otro',
] as const

const placeFields = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  /** Nombres alternativos ("el Monumento", "la Siberia") que usa el asistente para encontrarlo. */
  aliases: z.array(z.string().trim().min(1, 'El alias no puede estar vacío')),
  category: z.enum(PLACE_CATEGORIES, { error: 'Categoría inválida' }),
  address: z.string().trim().min(1, 'La dirección es obligatoria'),
  lat: latitudeSchema,
  lng: longitudeSchema,
  imageUrl: z.url('La URL de la imagen es inválida').optional(),
  featured: z.boolean(),
})

// Los valores por defecto van solo al crear: en una actualización parcial pisarían lo guardado.
export const createPlaceSchema = placeFields.extend({
  aliases: placeFields.shape.aliases.default([]),
  featured: placeFields.shape.featured.default(false),
})

export const updatePlaceSchema = placeFields.partial()

export type PlaceCategory = (typeof PLACE_CATEGORIES)[number]
export type CreatePlaceInput = z.infer<typeof createPlaceSchema>
export type UpdatePlaceInput = z.infer<typeof updatePlaceSchema>

/** Lugar tal como lo devuelve la API. Las fechas viajan como texto ISO 8601. */
export interface Place {
  id: string
  name: string
  aliases: string[]
  category: PlaceCategory
  address: string
  lat: number
  lng: number
  imageUrl?: string
  featured: boolean
  active: boolean
  createdAt: string
  updatedAt: string
}
