import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { UserSigninDto } from 'src/dto/userSignin.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  registration(@Body(ValidationPipe) registerDto: RegisterUserDto) {
    return this.authService.registerUser(registerDto);
  }
  @Post('signin')
  signIn(@Body(ValidationPipe) signinDto: UserSigninDto) {
    return this.authService.signIn(signinDto);
  }
}
