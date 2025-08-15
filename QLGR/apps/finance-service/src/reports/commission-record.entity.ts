import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CommissionRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  invoiceId: string;

  @Column('numeric', { precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
