import { Link } from 'react-router'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { PATHS } from '@/routes/paths'

export function NotFoundPage() {
  return (
    <>
      <PageHeader title="Página no encontrada" description="La dirección no existe." />
      <Button asChild variant="outline">
        <Link to={PATHS.home}>Volver al inicio</Link>
      </Button>
    </>
  )
}
