import { Injectable } from '@nestjs/common';
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
  async newTodo(title: string, description: string) {
    const myTodo = this.getAllTodo();
    console.log((await myTodo).length);
    const todo = new TodoEntity();

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
}
