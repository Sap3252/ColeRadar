import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().min(1, 'Falta MONGODB_URI'),
  FRONTEND_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32, 'BETTER_AUTH_SECRET debe tener al menos 32 caracteres'),
  BETTER_AUTH_URL: z.url(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('Variables de entorno inválidas:', z.flattenError(parsed.error).fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
