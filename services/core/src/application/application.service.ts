import { Injectable } from '@nestjs/common';
import { Application } from './graphql/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOperator, Repository } from 'typeorm';
import { CreateOneApplicationArgs } from './graphql/args/CreateOneApplicationArgs';
import { User } from 'src/user/graphql/user.entity';
import { UpdateOneApplicationArgs } from './graphql/args/UpdateOneApplicationArgs';
import { ApplicationStatus } from './graphql/application.enum';
import { GetApplicationsArgs } from './graphql/args/GetApplicationsArgs';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async find(args: GetApplicationsArgs) {
    if (args.date_from && !args.date_to) {
      args.date_to = new Date(
        new Date(
          new Date(args.date_from).setHours(args.date_from.getHours() + 2),
        ).setMilliseconds(-1),
      );
    }
    console.log(args);
    return await this.applicationRepository.find({
      where: {
        date: args.date_from ? Between(args.date_from, args.date_to) : null,
        status: args.status,
        place: args.place,
        id: args.id,
      },
    });
  }

  async findByDateAndHours(
    date: Date,
    status: ApplicationStatus = ApplicationStatus.APPROVED,
  ) {
    const date_to = new Date(date.toISOString());
    date_to.setHours(date.getHours() + 2);
    date_to.setMilliseconds(-1);
    return await this.applicationRepository.find({
      where: {
        date: Between(date, date_to),
        status: status,
      },
    });
  }

  async findById(id: string) {
    return await this.applicationRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
  }

  async getApplicationHistory(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['applications'],
    });
    return user ? user.applications : [];
  }

  async create(args: CreateOneApplicationArgs) {
    console.log(args);
    const user = await this.userRepository.findOneBy({
      email: args.email,
    });
    console.log(user);
    if (user) {
      const res = await this.applicationRepository.save({
        date: args.date,
        place: args.place,
        user: user,
      });
      console.log(res);
      return res;
    }
    const unAuthUser = await this.userRepository.save({
      email: args.email,
      password: args.email,
    });
    console.log(unAuthUser);
    const res = await this.applicationRepository.save({
      date: args.date,
      place: args.place,
      user: unAuthUser,
    });
    console.log(res);
    return res;
  }

  async delete(id: string) {
    return await this.applicationRepository.delete(id);
  }

  async update(args: UpdateOneApplicationArgs) {
    const { id, ...updateArgs } = args;
    return await this.applicationRepository.update(id, updateArgs);
  }
}
