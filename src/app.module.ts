import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Creole@123',
  database: 'nestjsTodo',
  autoLoadEntities: true,
  synchronize: true,
};
@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TodoModule,
    TypeOrmModule.forRoot(ormOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
