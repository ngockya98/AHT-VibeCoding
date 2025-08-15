import helmet from 'helmet';
import { NestMiddleware } from '@nestjs/common';

export class HelmetMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    helmet()(req, res, next);
  }
}
