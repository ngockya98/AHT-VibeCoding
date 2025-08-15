import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Warranty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vehicleId: string;

  @Column()
  repairOrderId: string;

  @Column({ type: 'timestamptz', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  terms: string;
}
