import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('todo')
export class TodoEntity {
  @PrimaryColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TodoStatus;

  @ManyToOne(() => UserEntity, (user) => user.todo)
  user: UserEntity;
  @Column()
  userId: number;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  WIP = 'WIP',
  COMPLETED = 'COMPLETED',
}
