import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warranty } from './warranty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Warranty])],
  exports: [TypeOrmModule],
})
export class WarrantiesModule {}
