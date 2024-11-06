import { IsEmail, isEmail, IsString, isString } from 'class-validator';

export class createUserDto {
  // validator package for emails
  @IsEmail()
  email: string;
  // validator package for string
  @IsString()
  password: string;
}
