import { IsEmail, IsString } from 'class-validator';

export class createUserDto {
  id: number;
  // validator package for emails
  @IsEmail()
  email: string;
  // validator package for string
  @IsString()
  password: string;
}
