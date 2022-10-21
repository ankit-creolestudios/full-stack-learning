import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import passport from 'passport';
import { UserEntity } from 'src/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtPersonalStrategy } from './jwt-personal.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'pvrsapvppape=p=p=',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtPersonalStrategy],
  exports: [PassportModule, JwtPersonalStrategy],
})
export class AuthModule {}
