import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TemplatesModule } from './templates/templates.module';
import { SendersModule } from './senders/senders.module';
import { QueueModule } from './queue/queue.module';
import { PreferencesModule } from './preferences/preferences.module';

@Module({
  imports: [
    TemplatesModule,
    SendersModule,
    QueueModule,
    PreferencesModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
