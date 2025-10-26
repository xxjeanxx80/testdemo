import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole, DEFAULT_ROLE } from '../constants/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  fullName: string;

  @Column({ unique: true, length: 120 })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'enum', enum: UserRole, default: DEFAULT_ROLE })
  role: UserRole;

  @Column({ type: 'int', default: 0 })
  loyaltyPoints: number;

  @Column({ nullable: true, length: 50 })
  oauthProvider?: string;

  @Column({ nullable: true, length: 120 })
  oauthSubject?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
