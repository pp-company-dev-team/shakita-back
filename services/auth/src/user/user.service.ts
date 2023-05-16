import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({
      id,
    });
  }
}
