import { Link } from 'react-router'
import { PATHS } from '../routes/paths'

export function NotFoundPage() {
  return (
    <section>
      <h1>Página no encontrada</h1>
      <p>
        La dirección no existe. <Link to={PATHS.home}>Volver al inicio</Link>
      </p>
    </section>
  )
}
