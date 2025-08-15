import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [ExampleModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
