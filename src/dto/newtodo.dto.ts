import { IsNotEmpty, MaxLength } from 'class-validator';

export class newtododto {
  @IsNotEmpty()
  @MaxLength(15, { message: 'max length 15 characters' })
  title: string;

  @IsNotEmpty()
  description: string;
}
