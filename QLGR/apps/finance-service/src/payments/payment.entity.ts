import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceId: string;

  @Column('numeric', { precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'timestamptz', nullable: true })
  paidAt: Date;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ nullable: true })
  method: string;
}
