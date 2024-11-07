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
    const checkuser = await this.usersService.find(email);
    if (checkuser.length) {
      throw new BadRequestException('Email already in use!');
    }
    // hash and salt the password

    //generate salt
    const salt = randomBytes(8).toString('hex'); // get random 8 bytes of data (16 characters), turn it into hexadecimal string (adsad123232)
    //generate hash by combining password and salt
    const hash = (await scrypt(password, salt, 32)) as Buffer; // hash a 32 character string with given values
    // give ts info that data type is Buffer so its not confused
    // join them together
    const result = salt + '.' + hash.toString('hex'); // seperate them with a dot so we know where password starts.
    //Also hash data type is buffer so we need to change it into hexadecimal string again
    const user = await this.usersService.create(email, result); // create a new user with given email and hashed-salted password
    return user;
  }
  async signIn(email: string, password: string) {
    const user = await this.usersService.find(email);

    if (!user) {
      throw new Error('User with this email does not exist!');
    }

    return user;
  }
}
