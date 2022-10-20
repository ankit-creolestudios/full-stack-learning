import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { newtododto } from 'src/dto/newtodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, TodoStatus } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}
  async getAllTodo() {
    return await this.repo.find();
  }
  async newTodo(newtododto) {
    const myTodo = this.getAllTodo();
    console.log((await myTodo).length);
    const todo = new TodoEntity();

    const { title, description } = newtododto;
    (await myTodo).length === 0
      ? (todo.id = 1)
      : (todo.id = (await myTodo).length + 1);
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    this.repo.create(todo);
    console.log(todo);
    return await this.repo.save(todo);
  }
  async updateTodo(id: number, status: TodoStatus) {
    try {
      await this.repo.update({ id }, { status });
      return this.repo.findOneBy({ id });
    } catch (err) {
      throw new InternalServerErrorException('something went wrong');
    }
  }
  async removeTodo(id: number) {
    try {
      return await this.repo.delete({ id });
    } catch (err) {
      throw new InternalServerErrorException('something went wrong');
    }
  }
}
