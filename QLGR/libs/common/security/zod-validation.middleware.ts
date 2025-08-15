import { NestMiddleware } from '@nestjs/common';
import { ZodSchema } from 'zod';

export function ZodValidationMiddleware(schema: ZodSchema): NestMiddleware {
  return {
    use(req: any, res: any, next: () => void) {
      try {
        schema.parse(req.body);
        next();
      } catch (err) {
        res.status(400).json({ error: err.errors });
      }
    },
  };
}
