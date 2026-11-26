import type { ComponentProps } from 'react'
import type { FieldError as FormError, UseFormRegisterReturn } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface TextFieldProps extends Omit<ComponentProps<typeof Input>, 'id' | keyof UseFormRegisterReturn> {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: FormError
}

/** Campo de texto conectado a React Hook Form, con su etiqueta y el error de validación. */
export function TextField({ id, label, registration, error, ...inputProps }: TextFieldProps) {
  const isInvalid = Boolean(error)

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} aria-invalid={isInvalid} {...inputProps} {...registration} />
      <FieldError errors={[error]} />
    </Field>
  )
}
