import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto'; // scrypt by default is callback. Callback functions are usually bad so we transform it into async function with promisify()

const scrypt = promisify(_scrypt); // instead of using different method name we imported it with a different name then fixed it with promisify and gave its original name back

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signUp(email: string, password: string) {
    // check if email is in use
    const user = await this.usersService.find(email);
    if (user) {
      throw new BadRequestException('Email already in use!');
    }
    // hash and salt the password
    const salt = randomBytes(8).toString('hex');
  }
  async signIn(email: string, password: string) {
    const user = await this.usersService.find(email);

    if (!user) {
      throw new Error('User with this email does not exist!');
    }

    return user;
  }
}
