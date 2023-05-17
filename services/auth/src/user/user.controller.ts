import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get('all')
  async getAll() {
    return await this.userRepository.find();
  }

  @Post()
  async register(@Body() args) {
    return await this.userRepository.save(args);
  }

  @Delete()
  async delete(@Body() args) {
    return await this.userRepository.delete(args.id);
  }

  @Put()
  async update(@Body() args) {
    return await this.userRepository.update(args.id, args);
  }
}
