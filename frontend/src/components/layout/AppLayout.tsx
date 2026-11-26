import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

export function AppLayout() {
  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
