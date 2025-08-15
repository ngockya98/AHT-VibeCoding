import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HelmetMiddleware } from '../../../libs/common/security/helmet.middleware';
import { CorsMiddleware } from '../../../libs/common/security/cors.middleware';
import { RateLimitMiddleware } from '../../../libs/common/security/rate-limit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new HelmetMiddleware().use);
  app.use(new CorsMiddleware().use);
  app.use(new RateLimitMiddleware().use);
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();
