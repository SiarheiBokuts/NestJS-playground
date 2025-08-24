import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/db/entities/todo.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import express from 'express';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Req() req: express.Request): Promise<Todo[]> {
    return await this.todoService.findAll(req.user!.id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async addTodo(
    @Req() req: express.Request,
    @Body() todo: { title: string },
  ): Promise<Todo> {
    return await this.todoService.create(todo, req.user!.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTodo(
    @Req() req: express.Request,
    @Param('id') todoId: string,
  ): Promise<any> {
    return await this.todoService.delete(todoId, req.user!.id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/complete')
  async completeTodo(
    @Req() req: express.Request,
    @Param('id') todoId: string,
  ): Promise<any> {
    return await this.todoService.complete(todoId, req.user!.id);
  }
}
