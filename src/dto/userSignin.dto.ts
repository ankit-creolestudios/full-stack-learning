import { IsNotEmpty } from 'class-validator';
export class UserSigninDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
