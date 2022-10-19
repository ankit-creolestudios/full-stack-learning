import { Injectable } from '@nestjs/common';
import { User } from 'src/users/types/user';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'anson',
      password: 'anson',
    },
    {
      username: 'dany',
      password: 'dany',
    },
    {
      username: 'derek',
      password: 'derek',
    },
    {
      username: 'samantha',
      password: 'samantha',
    },
  ];
  getUsers() {
    return this.users;
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
