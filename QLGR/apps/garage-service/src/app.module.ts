import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { CustomersModule } from './customers/customers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { RepairOrdersModule } from './repair-orders/repair-orders.module';
import { TasksModule } from './tasks/tasks.module';
import { WorkLogsModule } from './work-logs/work-logs.module';
import { WarrantiesModule } from './warranties/warranties.module';

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
    CustomersModule,
    VehiclesModule,
    AppointmentsModule,
    RepairOrdersModule,
    TasksModule,
    WorkLogsModule,
    WarrantiesModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
