import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('users') // Assurez-vous que le décorateur @Controller('users') est présent
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post() // Assurez-vous que le décorateur @Post() est présent
  async createUser(
    @Body()
    userData: {
      email: string;
      name: string;
      password: string;
      verifyToken?: string;
    },
  ) {
    return this.usersService.create(
      userData.email,
      userData.name,
      userData.password,
      userData.verifyToken || '',
    );
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(parseInt(id));
  }
}
