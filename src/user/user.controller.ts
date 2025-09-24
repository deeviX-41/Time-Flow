import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import type { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('Users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.UserService.getAllUsers();
  }

  @Post()
  async createUser(@Body() data: User) {
    return this.UserService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.UserService.getUserById(Number(id));
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.UserService.deleteUser(Number(id));
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: User) {
    return this.UserService.updateUser(Number(id), data);
  }
}
