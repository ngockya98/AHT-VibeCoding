import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PIIEncryptTransformer } from '../../../libs/common/security/pii-encrypt.transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, transformer: new PIIEncryptTransformer() })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true, transformer: new PIIEncryptTransformer() })
  phone: string;
}
