import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './graphql/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async create(args: any) {
    return await this.sessionRepository.save(args);
  }

  async findSessionWithUserByRefreshToken(refreshToken: string) {
    return await this.sessionRepository.findOne({
      where: {
        refreshToken,
      },
      relations: ['user'],
    });
  }

  async update(args: any) {
    console.log('args', args);
    return await this.sessionRepository.update(args.id, {
      refreshToken: args.refreshToken,
    });
  }
}
