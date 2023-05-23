import { Injectable } from '@nestjs/common';
import { Application } from './graphql/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async findByUsername(date: Date) {
    return await this.applicationRepository.findOne({
      where: {
        date,
      },
    });
  }

  async findById(id: string) {
    const test = await this.applicationRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    console.log(test);
    return test;
  }

  async create(args: { place: string; date: Date }) {
    return await this.applicationRepository.save(args);
  }

  async delete(id: string) {
    return await this.applicationRepository.delete(id);
  }

  async update(args: any) {
    return await this.applicationRepository.update(args.id, args);
  }
}
