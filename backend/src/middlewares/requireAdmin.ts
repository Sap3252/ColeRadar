import type { RequestHandler } from 'express';
import { ADMIN_ROLE } from '@coleradar/shared';
import { HttpError } from '../utils/HttpError.js';

/** Se usa siempre después de requireAuth: router.post('/', requireAuth, requireAdmin, ...). */
export const requireAdmin: RequestHandler = (req, _res, next) => {
  if (!req.auth) throw new HttpError(401, 'Tenés que iniciar sesión');
  if (req.auth.user.role !== ADMIN_ROLE) {
    throw new HttpError(403, 'Necesitás permisos de administrador');
  }

  next();
};
