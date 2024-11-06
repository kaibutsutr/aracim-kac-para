import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {} // dependency injectsion since we need users service here

  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    // use body decorator to request body object and check if its in createUserDto format, if not throw an error
    this.userService.create(body.email, body.password);
  }
}
