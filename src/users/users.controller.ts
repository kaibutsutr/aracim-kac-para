import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
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
  @Get('/:id')
  findUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Get('/')
  findUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }
  @Patch('/:id')
  updateUser(@Body() body: createUserDto, @Param('id') id: number) {
    return this.userService.update(id, body);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
