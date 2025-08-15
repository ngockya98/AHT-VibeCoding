import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Example {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
