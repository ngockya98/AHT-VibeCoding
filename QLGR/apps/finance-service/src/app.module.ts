import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';
import { TaxModule } from './tax/tax.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'automotive',
      autoLoadEntities: true,
      synchronize: true,
    }),
    InvoicesModule,
    PaymentsModule,
    ReportsModule,
    TaxModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
