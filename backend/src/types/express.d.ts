import type { AuthSession } from '../config/auth.js';

declare global {
  namespace Express {
    interface Request {
      /** Sesión del usuario logueado; la completa el middleware requireAuth. */
      auth?: AuthSession;
    }
  }
}

export {};
