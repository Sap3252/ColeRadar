import { CircleAlert } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface FormErrorAlertProps {
  message: string
}

/** Error que devuelve el servidor al enviar un formulario (no uno de validación de un campo). */
export function FormErrorAlert({ message }: FormErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <CircleAlert aria-hidden />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
