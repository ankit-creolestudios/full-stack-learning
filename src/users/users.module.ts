import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [{ provide: 'USERSERVICE', useClass: UsersService }],
})
export class UsersModule {}
