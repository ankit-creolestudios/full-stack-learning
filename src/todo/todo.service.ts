import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { newtododto } from 'src/dto/newtodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, TodoStatus } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { User } from 'src/auth/user.decorator';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}
  async getAllTodo(user: UserEntity) {
    const query = await this.repo.createQueryBuilder('todo');
    query.where(`todo.userId= :userId`, { userId: user.id });

    try {
      return await query.getMany();
    } catch (err) {
      throw new InternalServerErrorException('no data found');
    }
  }
  async newTodo(newtododto, user) {
    const myTodo = this.getAllTodo(user);
    console.log(await myTodo);
    const todo = new TodoEntity();

    const { title, description } = newtododto;
    (await myTodo).length === 0
      ? (todo.id = 1)
      : (todo.id = (await myTodo).length + 1);
    todo.userId = user.id;
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
