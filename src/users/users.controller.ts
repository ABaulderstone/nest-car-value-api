import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Seralize } from '../interceptors/seralize.interceptor';
import { UserDto } from './dtos/user.dto';

import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('auth')
@Seralize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() data: CreateUserDto) {
    console.log(data);
    this.usersService.create(data);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('In the handler');
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not Found');
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(parseInt(id), data);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
