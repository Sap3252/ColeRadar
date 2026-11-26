interface LoadingIndicatorProps {
  message?: string
}

export function LoadingIndicator({ message = 'Cargando…' }: LoadingIndicatorProps) {
  return (
    <p className="status-message" role="status" aria-live="polite">
      {message}
    </p>
  )
}
