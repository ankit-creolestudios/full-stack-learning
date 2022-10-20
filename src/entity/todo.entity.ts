import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}

export enum TodoStatus {
  OPEN = 'OPEN',
  WIP = 'WIP',
  COMPLETED = 'COMPLETED',
}
