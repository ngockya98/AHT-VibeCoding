import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  garageId: string;

  @Column()
  customerId: string;

  @Column()
  vehicleId: string;

  @Column({ type: 'timestamptz' })
  scheduledAt: Date;

  @Column({ default: 'PENDING' })
  status: string;
}
