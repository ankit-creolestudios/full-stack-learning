import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { newtododto } from 'src/dto/newtodo.dto';
import { TodoStatus } from 'src/entity/todo.entity';
import { TodoStatusValidationPipe } from 'src/pipe/TodoStatusValidation.pipe';
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
  newTodo(@Body(ValidationPipe) data: newtododto) {
    // const { title, description } = data;
    // return this.todoService.newTodo(title, description);
    return this.todoService.newTodo(data);
  }
  @Patch('/new/:id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
  ) {
    return this.todoService.updateTodo(id, status);
  }
  @Delete('/new/:id')
  removeTodo(@Param('id') id: number) {
    return this.todoService.removeTodo(id);
  }
}
