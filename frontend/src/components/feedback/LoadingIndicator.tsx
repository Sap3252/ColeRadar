import { LoaderCircle } from 'lucide-react'

interface LoadingIndicatorProps {
  message?: string
}

export function LoadingIndicator({ message = 'Cargando…' }: LoadingIndicatorProps) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status" aria-live="polite">
      <LoaderCircle className="size-4 animate-spin" aria-hidden />
      {message}
    </p>
  )
}
