import rateLimit from 'express-rate-limit';
import { NestMiddleware } from '@nestjs/common';

export class RateLimitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })(req, res, next);
  }
}
