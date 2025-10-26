// entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'password_hash' })
  password: string;  // hashed

  @Column({ default: 'user' })
  role: string; // e.g., 'admin', 'user'
  
 @CreateDateColumn({ name: 'created' })
 createdAt: Date;
}
