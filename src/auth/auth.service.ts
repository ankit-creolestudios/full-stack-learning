import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserSigninDto } from 'src/dto/userSignin.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}
  async registerUser(registerDto: RegisterUserDto) {
    const { username, password } = registerDto;
    const hashed = await bcrypt.hash(password, 12);
    const salt = await bcrypt.getSalt(hashed);
    const user = new UserEntity();
    user.username = username;
    user.password = hashed;
    user.salt = salt;
    console.log(salt);
    this.repo.create(user);
    try {
      return await this.repo.save(user);
    } catch (err) {
      throw new InternalServerErrorException(
        'something went wrong, user not created',
      );
    }
  }
  async signIn(signinDto: UserSigninDto) {
    const { username, password } = signinDto;
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('invalid credential');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const jwtPayload = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      return { username: user.username, token: jwtToken };
    } else {
      throw new UnauthorizedException('invalid credential');
    }
  }
}
