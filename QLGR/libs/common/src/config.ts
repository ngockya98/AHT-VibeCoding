import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  RABBITMQ_HOST: z.string(),
  RABBITMQ_PORT: z.string(),
  ELASTICSEARCH_HOST: z.string(),
  ELASTICSEARCH_PORT: z.string(),
  MINIO_HOST: z.string(),
  MINIO_PORT: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  JWT_SECRET: z.string(),
  FRONTEND_URL: z.string(),
});

export const config = envSchema.parse(process.env);
