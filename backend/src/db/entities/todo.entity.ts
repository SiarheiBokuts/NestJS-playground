import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  // Using string because PostgreSQL BIGINT can exceed JavaScript's safe integer range (2^53 - 1)
  // See: https://typeorm.io/entities#bigint-columns
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @ManyToOne(() => User, (user) => user.todos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_todo_user' })
  user?: User;

  // Exclude userId from default select queries to enhance security and reduce payload size
  @Column({ name: 'user_id', select: false })
  userId?: string;
}
