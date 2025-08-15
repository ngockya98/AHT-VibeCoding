import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RepairOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  garageId: string;

  @Column()
  customerId: string;

  @Column()
  vehicleId: string;

  @Column({ nullable: true })
  appointmentId: string;

  @Column({ default: 'DRAFT' })
  status: string;

  @Column('numeric', { precision: 12, scale: 2, default: 0 })
  totalPrice: number;

  @Column('numeric', { precision: 12, scale: 2, default: 0 })
  discount: number;
}
