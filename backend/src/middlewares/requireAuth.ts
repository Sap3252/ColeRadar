import type { RequestHandler } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../config/auth.js';
import { HttpError } from '../utils/HttpError.js';

export const requireAuth: RequestHandler = async (req, _res, next) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (!session) throw new HttpError(401, 'Tenés que iniciar sesión');

  req.auth = session;
  next();
};
