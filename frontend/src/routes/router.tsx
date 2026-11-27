import { ADMIN_ROLE } from '@coleradar/shared'
import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/components/layout/AppLayout'
import { AdminPage } from '@/pages/admin/AdminPage'
import { HomePage } from '@/pages/HomePage'
import { LinesPage } from '@/pages/LinesPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlacesPage } from '@/pages/PlacesPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { PATHS } from './paths'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: PATHS.home, element: <HomePage /> },
      { path: PATHS.lines, element: <LinesPage /> },
      { path: PATHS.places, element: <PlacesPage /> },
      { path: PATHS.login, element: <LoginPage /> },
      { path: PATHS.register, element: <RegisterPage /> },
      {
        element: <ProtectedRoute requiredRole={ADMIN_ROLE} />,
        children: [{ path: PATHS.admin, element: <AdminPage /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
