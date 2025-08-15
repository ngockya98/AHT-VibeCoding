import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductMedia } from './product-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductMedia])],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
