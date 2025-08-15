import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { CommissionRecord } from './commission-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, CommissionRecord])],
  exports: [TypeOrmModule],
})
export class ReportsModule {}
