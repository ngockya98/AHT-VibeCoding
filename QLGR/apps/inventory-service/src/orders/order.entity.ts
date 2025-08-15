import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column('numeric', { precision: 12, scale: 2, default: 0 })
  totalPrice: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
