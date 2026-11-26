import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './config/auth.js';
import { env } from './config/env.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));

// Va antes de express.json(): Better Auth lee el cuerpo del pedido por su cuenta.
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'conectada' : 'desconectada',
  });
});

//app.use('/api/notices', noticesRouter), etc.

app.use(notFound);
app.use(errorHandler);
