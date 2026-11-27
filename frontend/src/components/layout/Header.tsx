import { BusFront } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PATHS } from '@/routes/paths'

const NAV_ITEMS = [
  { to: PATHS.home, label: 'Inicio' },
  { to: PATHS.lines, label: 'Líneas' },
  { to: PATHS.places, label: 'Lugares' },
]

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-1.5 text-sm transition-colors',
    isActive ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
  )

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to={PATHS.home} className="flex items-center gap-2 text-lg font-semibold">
          <BusFront className="size-5 text-primary" aria-hidden />
          ColeRadar
        </Link>
        <nav className="flex flex-wrap items-center gap-1" aria-label="Navegación principal">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink key={to} to={to} end className={navLinkClassName}>
              {label}
            </NavLink>
          ))}
          <Button asChild size="sm" className="ml-1">
            <Link to={PATHS.login}>Ingresar</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
