import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { Product } from '../products/product.entity';

@Entity()
@Unique(['warehouseId', 'productId'])
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  warehouseId: string;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  @Column()
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('int', { default: 0 })
  quantity: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  updatedAt: Date;
}
