import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/db/entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(userId: string): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user: { id: userId } } });
  }

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const todo = {
      ...createTodoDto,
      isCompleted: false,
      createdAt: new Date(),
      user: { id: userId },
    } as Todo;

    const createdTodo = this.todoRepository.create(todo);
    return this.todoRepository.save(createdTodo);
  }
}
