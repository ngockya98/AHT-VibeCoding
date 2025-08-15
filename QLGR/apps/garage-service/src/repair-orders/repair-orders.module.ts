import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairOrder } from './repair-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepairOrder])],
  exports: [TypeOrmModule],
})
export class RepairOrdersModule {}
