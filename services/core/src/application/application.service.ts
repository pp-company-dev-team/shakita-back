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

  async findByUsername(email: string) {
    return await this.applicationRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await this.applicationRepository.findOneBy({
      id,
    });
  }

  async create(args: any) {
    return await this.applicationRepository.save(args);
  }

  async delete(id: string) {
    return await this.applicationRepository.delete(id);
  }

  async update(args: any) {
    return await this.applicationRepository.update(args.id, args);
  }
}
