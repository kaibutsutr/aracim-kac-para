import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { updateUserDto } from './dtos/update-user.dto';
import { Auth } from 'typeorm';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {} // dependency injectsion since we need users service here

  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    // use body decorator to request body object and check if its in createUserDto format, if not throw an error
    this.authService.signUp(body.email, body.password);
  }
  @Post('/signin')
  signInUser(@Body() body: createUserDto) {
    // use body decorator to request body object and check if its in createUserDto format, if not throw an error
    this.authService.signIn(body.email, body.password); //
  }
  @UseInterceptors(ClassSerializerInterceptor) // use interceptor on get so server doesnt return password!
  @Get('/:id')
  async findUser(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found'); // instead of plain errors, we throw exceptions in nestJS
    }
    return user;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async findUsers(@Query('email') email: string) {
    const users = await this.userService.find(email);
    if (!users) {
      throw new NotFoundException('User not found'); // instead of plain errors, we throw exceptions in nestJS
    }
    return users;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  updateUser(@Body() body: updateUserDto, @Param('id') id: number) {
    // we use updateuserdto here to make filling data optional. User doesnt have to fill every part of data
    return this.userService.update(id, body);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
