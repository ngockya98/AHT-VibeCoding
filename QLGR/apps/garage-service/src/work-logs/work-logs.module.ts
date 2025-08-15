import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkLog } from './work-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLog])],
  exports: [TypeOrmModule],
})
export class WorkLogsModule {}
