import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from './authSchemas'

const HTTP_TOO_MANY_REQUESTS = 429

const ALREADY_REGISTERED_MESSAGE = 'Ya existe una cuenta con ese email'

// Códigos que devuelve Better Auth; los mensajes originales vienen en inglés.
const MESSAGES_BY_CODE: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: 'Email o contraseña incorrectos',
  INVALID_EMAIL: 'El email no es válido',
  USER_ALREADY_EXISTS: ALREADY_REGISTERED_MESSAGE,
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: ALREADY_REGISTERED_MESSAGE,
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`,
  PASSWORD_TOO_LONG: `La contraseña no puede superar los ${MAX_PASSWORD_LENGTH} caracteres`,
}

const GENERIC_MESSAGE = 'No pudimos completar la operación. Probá de nuevo en unos minutos.'

interface AuthError {
  code?: string
  status?: number
}

export function getAuthErrorMessage({ code, status }: AuthError): string {
  if (code && code in MESSAGES_BY_CODE) return MESSAGES_BY_CODE[code]
  if (status === HTTP_TOO_MANY_REQUESTS) return 'Demasiados intentos. Esperá un momento y volvé a probar.'

  return GENERIC_MESSAGE
}
