export interface ValidationErrorDetail {
  field: string
  message: string
}

/** Cuerpo de toda respuesta de error de la API (400, 401, 403, 404, 500). */
export interface ErrorResponse {
  error: string
  /** Solo en errores 400: un detalle por cada campo que no pasó la validación de Zod. */
  details?: ValidationErrorDetail[]
}
