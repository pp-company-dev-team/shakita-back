import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get()
  async getAll() {
    return await this.userRepository.find();
  }

  @Post('/register')
  async register(@Body() args) {
    return await this.userRepository.save(args);
  }

  @Post('/login')
  async login(@Body() args) {
    console.log(args);
  }
}
