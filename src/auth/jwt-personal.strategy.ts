import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

export class JwtPersonalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'pvrsapvppape=p=p=',
    });
  }
  async validate(payload) {
    const { username } = payload;
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
