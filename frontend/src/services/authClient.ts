import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { env } from '../config/env'

// adminClient expone el rol del usuario en la sesión y las acciones del panel de usuarios.
export const authClient = createAuthClient({
  baseURL: env.apiUrl,
  plugins: [adminClient()],
})
