import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PriceRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('numeric', { precision: 5, scale: 2, nullable: true })
  discountPercent: number;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
