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
    //we create an entity first to activate hooks, we dont want to save without creating an entity instance

    return this.repo.save(user); // save it to db
  }
  findOne(id: number) {
    return this.repo.findOne(id);
  }
  find(email: string) {
    return this.repo.find({ email });
  }
  update() {}
  remove() {}
}
