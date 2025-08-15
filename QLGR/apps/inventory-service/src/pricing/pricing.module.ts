import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceRule } from './price-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceRule])],
  exports: [TypeOrmModule],
})
export class PricingModule {}
