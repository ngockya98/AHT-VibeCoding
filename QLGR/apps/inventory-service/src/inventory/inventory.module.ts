import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { Warehouse } from './warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Warehouse])],
  exports: [TypeOrmModule],
})
export class InventoryModule {}
