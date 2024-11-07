import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (id === null) {
      throw new BadRequestException('No valid id');
    }
    // bring only one user
    return this.repo.findOneBy({ id });
  }
  find(email: string) {
    // bring many users with this mail
    return this.repo.find({ where: { email } });
  }
  async update(id: number, attrs: Partial<User>) {
    // attrs has the at least one piece of User data, like email or password
    // if we dont do it this way, we wont be able to update if user just wants to update one property
    const user = await this.repo.findOneBy({ id }); //  find the user with given id then check if its not null
    if (!user) {
      throw new NotFoundException('User not found!!!');
    }
    Object.assign(user, attrs); // assign the values in attrs to user object
    return this.repo.save(user); // we save here to activate hooks
  }
  async remove(id: number) {
    const user = await this.repo.findOneBy({ id }); //  find the user with given id then check if its not null
    if (!user) {
      throw new NotFoundException('User not found!!!'); // instead of error we throw fitting exception
    }
    return this.repo.remove(user);
  }
}
