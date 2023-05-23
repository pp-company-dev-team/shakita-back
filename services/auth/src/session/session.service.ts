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

  async findSessionByUserIdAndIpAndUserAgent(
    user: any,
    ip: string,
    userAgent: any,
  ) {
    const sessions = await this.sessionRepository.find({
      where: {
        user,
        ip,
      },
    });

    const session = sessions.find(
      (session) =>
        session.userAgent?.browser?.name === userAgent?.browser?.name,
    );

    return session;
  }

  async update(args: any) {
    const { id, ...data } = args;
    return await this.sessionRepository.update(id, {
      ...data,
    });
  }
}
