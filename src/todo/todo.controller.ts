import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { newtododto } from 'src/dto/newtodo.dto';
import { TodoStatus } from 'src/entity/todo.entity';
import { UserEntity } from 'src/entity/user.entity';
import { TodoStatusValidationPipe } from 'src/pipe/TodoStatusValidation.pipe';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  //service inject into controller

  constructor(private todoService: TodoService) {}
  //http get verb

  @Get('')
  getAllTodo(@User() user: UserEntity) {
    return this.todoService.getAllTodo(user);
  }

  @Post('/new')
  newTodo(@Body(ValidationPipe) data: newtododto, @User() user: UserEntity) {
    // const { title, description } = data;
    // return this.todoService.newTodo(title, description);
    return this.todoService.newTodo(data, user);
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
