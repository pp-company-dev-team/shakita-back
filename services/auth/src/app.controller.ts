import { Controller, Get } from '@nestjs/common';
import { Test } from './test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Controller()
export class AppController {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  @Get()
  async getAll() {
    return await this.testRepository.find();
  }
}
