import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  repairOrderId: string;

  @Column({ nullable: true })
  orderId: string;

  @Column()
  customerId: string;

  @Column('numeric', { precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  issuedAt: Date;

  @Column({ default: 'PENDING' })
  status: string;
}
