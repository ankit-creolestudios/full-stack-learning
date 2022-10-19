import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/user';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERSERVICE') private readonly userService: UsersService,
  ) {}
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:username')
  getUserById(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('user doent exist', HttpStatus.BAD_REQUEST);
  }
}
