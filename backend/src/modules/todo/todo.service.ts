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

  async create(
    createTodoDto: CreateTodoDto,
    userId: string,
  ): Promise<Omit<Todo, 'userId' | 'user'>> {
    const todo: Partial<Todo> = {
      ...createTodoDto,
      isCompleted: false,
      createdAt: new Date(),
      userId: userId,
    };

    const createdTodo = this.todoRepository.create(todo);

    const savedTodo = await this.todoRepository.save(createdTodo);

    // Removed `user` and `userId` before returning the object
    // to avoid exposing internal relation details in the API response.
    savedTodo.user = undefined;
    savedTodo.userId = undefined;

    return savedTodo;
  }

  async delete(todoId: string, userId: string): Promise<boolean> {
    await this.todoRepository.delete({ id: todoId, userId });
    return true;
  }
}
