import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  //   ManyToOne,
  CreateDateColumn,
  //   UpdateDateColumn,
} from 'typeorm';
// import { User } from './user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  //   @ManyToOne(() => User, (user) => user.todos)
  //   user: User;
}
