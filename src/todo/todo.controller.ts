import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  //service inject into controller

  constructor(private todoService: TodoService) {}
  //http get verb

  @Get('')
  getAllTodo() {
    return this.todoService.getAllTodo();
  }

  @Post('/new')
  newTodo(@Body() data) {
    const { title, description } = data;
    return this.todoService.newTodo(title, description);
  }
}
