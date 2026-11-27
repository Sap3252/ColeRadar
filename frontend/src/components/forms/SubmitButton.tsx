import { LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface SubmitButtonProps {
  isSubmitting: boolean
  children: ReactNode
}

export function SubmitButton({ isSubmitting, children }: SubmitButtonProps) {
  return (
    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
      {isSubmitting && <LoaderCircle className="animate-spin" aria-hidden />}
      {children}
    </Button>
  )
}
