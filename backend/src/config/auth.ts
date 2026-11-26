import { ADMIN_ROLE, DEFAULT_ROLE } from '@coleradar/shared';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { admin } from 'better-auth/plugins';
import { database, mongoClient } from './db.js';
import { env } from './env.js';

const isProduction = env.NODE_ENV === 'production';

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(database, { client: mongoClient }),
  trustedOrigins: [env.FRONTEND_URL],
  emailAndPassword: { enabled: true },
  // El plugin admin agrega el rol al usuario; quien se registra no puede elegirlo.
  plugins: [admin({ defaultRole: DEFAULT_ROLE, adminRoles: [ADMIN_ROLE] })],
  advanced: {
    // En producción el frontend (Vercel) y el backend (Render) están en dominios distintos:
    // sin SameSite=None y Secure el navegador no manda la cookie de sesión.
    defaultCookieAttributes: isProduction ? { sameSite: 'none', secure: true } : undefined,
  },
});

export type AuthSession = typeof auth.$Infer.Session;
