import { z } from 'zod'

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10
export const MAX_LIMIT = 50

export const paginationQuerySchema = z.object({
  page: z.coerce
    .number({ error: 'La página debe ser un número' })
    .int('La página debe ser un número entero')
    .min(1, 'La página mínima es 1')
    .default(DEFAULT_PAGE),
  limit: z.coerce
    .number({ error: 'El límite debe ser un número' })
    .int('El límite debe ser un número entero')
    .min(1, 'El límite mínimo es 1')
    .max(MAX_LIMIT, `El límite máximo es ${MAX_LIMIT}`)
    .default(DEFAULT_LIMIT),
})

export type PaginationQuery = z.infer<typeof paginationQuerySchema>

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}
