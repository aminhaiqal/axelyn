import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  async create(@Body() body: any) {
    return this.userService.createUser(body);
  }
}