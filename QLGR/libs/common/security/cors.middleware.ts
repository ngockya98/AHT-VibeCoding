import cors from 'cors';
import { NestMiddleware } from '@nestjs/common';

export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    cors()(req, res, next);
  }
}
