import { z } from 'zod'
import { emptyToUndefined } from './emptyValues.js'

export const NOTICE_TYPES = ['desvio', 'corte', 'refuerzo', 'paro', 'otro'] as const
export const MIN_PRIORITY = 1
export const MAX_PRIORITY = 5

const noticeFields = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(120, 'El título no puede superar los 120 caracteres'),
  description: z
    .string()
    .trim()
    .min(1, 'La descripción es obligatoria')
    .max(2000, 'La descripción no puede superar los 2000 caracteres'),
  type: z.enum(NOTICE_TYPES, { error: 'Tipo de aviso inválido' }),
  /** Nombres de línea tal como los publica la API municipal, por ejemplo "101 NEGRO". */
  affectedLines: z
    .array(z.string().trim().min(1, 'La línea no puede estar vacía'))
    .min(1, 'Indicá al menos una línea afectada')
    .refine((lines) => new Set(lines).size === lines.length, 'No repitas líneas afectadas'),
  startsAt: z.preprocess(
    emptyToUndefined,
    z.coerce.date({ error: 'La fecha de inicio es obligatoria' }),
  ),
  endsAt: z.preprocess(
    emptyToUndefined,
    z.coerce.date({ error: 'La fecha de fin es inválida' }).optional(),
  ),
  priority: z.coerce
    .number()
    .int('La prioridad debe ser un número entero')
    .min(MIN_PRIORITY, `La prioridad mínima es ${MIN_PRIORITY}`)
    .max(MAX_PRIORITY, `La prioridad máxima es ${MAX_PRIORITY}`),
})

const endsAfterStart = (notice: { startsAt?: Date; endsAt?: Date }) =>
  !notice.startsAt || !notice.endsAt || notice.endsAt > notice.startsAt

const ENDS_BEFORE_START_ERROR = {
  message: 'La fecha de fin debe ser posterior a la de inicio',
  path: ['endsAt'],
}

export const createNoticeSchema = noticeFields.refine(endsAfterStart, ENDS_BEFORE_START_ERROR)

export const updateNoticeSchema = noticeFields
  .partial()
  .refine(endsAfterStart, ENDS_BEFORE_START_ERROR)

export type NoticeType = (typeof NOTICE_TYPES)[number]
export type CreateNoticeInput = z.infer<typeof createNoticeSchema>
export type UpdateNoticeInput = z.infer<typeof updateNoticeSchema>

/** Aviso tal como lo devuelve la API. Las fechas viajan como texto ISO 8601. */
export interface Notice {
  id: string
  title: string
  description: string
  type: NoticeType
  affectedLines: string[]
  startsAt: string
  endsAt?: string
  priority: number
  active: boolean
  /** Id del usuario admin que lo publicó. */
  createdBy: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}
