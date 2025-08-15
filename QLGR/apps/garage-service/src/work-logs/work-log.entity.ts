import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WorkLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  taskId: string;

  @Column()
  userId: string;

  @Column({ type: 'timestamptz', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endedAt: Date;

  @Column({ nullable: true })
  notes: string;
}
