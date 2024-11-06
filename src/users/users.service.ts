import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm'; // we need this decorator to inject repo

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    // use dependency injection here since service is dependant on repo
  }
  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create a user object with given properties
    return this.repo.save(user); // save it to db
  }
}
