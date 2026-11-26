import type { ErrorRequestHandler } from 'express';
import type { ZodError } from 'zod';
import { ZodError as ZodErrorClass } from 'zod';
import type { ErrorResponse, ValidationErrorDetail } from '@coleradar/shared';
import { HttpError } from '../utils/HttpError.js';
import { env } from '../config/env.js';

function toValidationDetails(error: ZodError): ValidationErrorDetail[] {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodErrorClass) {
    const body: ErrorResponse = { error: 'Datos inválidos', details: toValidationDetails(err) };
    res.status(400).json(body);
    return;
  }
  if (err instanceof HttpError) {
    const body: ErrorResponse = { error: err.message };
    res.status(err.status).json(body);
    return;
  }
  console.error(err);
  const body: ErrorResponse = {
    error: env.NODE_ENV === 'production' ? 'Error interno del servidor' : String(err),
  };
  res.status(500).json(body);
};