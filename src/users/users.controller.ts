import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    // use body decorator to request body object and check if its in createUserDto format, if not throw an error
    console.log(body);
  }
}
