import { Link, NavLink } from 'react-router'
import { PATHS } from '../../routes/paths'

const NAV_ITEMS = [
  { to: PATHS.home, label: 'Inicio' },
  { to: PATHS.lines, label: 'Líneas' },
  { to: PATHS.places, label: 'Lugares' },
]

export function Header() {
  return (
    <header className="header">
      <Link to={PATHS.home} className="header__brand">
        ColeRadar
      </Link>
      <nav className="header__nav" aria-label="Navegación principal">
        {NAV_ITEMS.map(({ to, label }) => (
          <NavLink key={to} to={to} end className="header__link">
            {label}
          </NavLink>
        ))}
        <NavLink to={PATHS.login} className="header__link header__link--accent">
          Ingresar
        </NavLink>
      </nav>
    </header>
  )
}
