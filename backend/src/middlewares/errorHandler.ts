import type { ErrorRequestHandler } from 'express';
import { z, ZodError } from 'zod';
import { HttpError } from '../utils/HttpError.js';
import { env } from '../config/env.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Datos inválidos', details: z.flattenError(err).fieldErrors });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, details: err.details });
    return;
  }
  console.error(err);
  res.status(500).json({
    error: env.NODE_ENV === 'production' ? 'Error interno del servidor' : String(err),
  });
};
