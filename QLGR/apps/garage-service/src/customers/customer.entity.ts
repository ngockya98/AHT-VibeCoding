import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PIIEncryptTransformer } from '../../../libs/common/security/pii-encrypt.transformer';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ nullable: true, transformer: new PIIEncryptTransformer() })
  phone: string;

  @Column({ nullable: true, transformer: new PIIEncryptTransformer() })
  email: string;
}
