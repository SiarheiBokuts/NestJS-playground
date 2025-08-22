import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/db/entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }
}
