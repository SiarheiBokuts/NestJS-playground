import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
// import { User } from './user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  // Using string because PostgreSQL BIGINT can exceed JavaScript's safe integer range (2^53 - 1)
  // See: https://typeorm.io/entities#bigint-columns
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
