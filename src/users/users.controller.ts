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
  Session,
  BadRequestException,
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    // use body decorator to request body object and check if its in createUserDto format, if not throw an error
    const user = await this.authService.signUp(body.email, body.password);
    session.id = user.id; // write id to cookies
    return user;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signin')
  async signInUser(@Body() body: createUserDto, @Session() session: any) {
    // use body decorator to request body object and check if its in createUserDto format, if not throw an error
    const user = await this.authService.signIn(body.email, body.password);
    session.id = user.id; // update cookies
    return user; //
  }
  @Post('signout')
  signOut(@Session() session: any) {
    session.id = null;
    return console.log('Sign out successful!');
  }

  // show the current logged user info
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/whoisthis')
  async whoisthis(@Session() session: any) {
    if (session.id === null) {
      throw new BadRequestException('User not logged in!');
    }
    const user = await this.userService.findOne(session.id);
    return user;
  }
  @UseInterceptors(ClassSerializerInterceptor) // use interceptor on get so server doesnt return password!
  @Get('/:id')
  async findUser(@Param('id') id: number) {
    const user = await this.userService.findOne(id); //123
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
