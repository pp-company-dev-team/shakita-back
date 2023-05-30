import { Injectable } from '@nestjs/common';
import { Application } from './graphql/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateOneApplicationArgs } from './graphql/args/CreateOneApplicationArgs';
import { User } from 'src/user/graphql/user.entity';
import { UpdateOneApplicationArgs } from './graphql/args/UpdateOneApplicationArgs';
import { ApplicationStatus } from './graphql/application.enum';
import { GetApplicationsArgs } from './graphql/args/GetApplicationsArgs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private mailerService: MailerService,
  ) {}

  async find(args: GetApplicationsArgs) {
    if (args.date_from && !args.date_to) {
      args.date_to = new Date(
        new Date(
          new Date(args.date_from).setHours(args.date_from.getHours() + 2),
        ).setMilliseconds(-1),
      );
    }
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
    let user = await this.userRepository.findOneBy({
      email: args.email,
    });
    if (!user) {
      user = await this.userRepository.save({
        email: args.email,
        password: args.email,
      });
    }
    //TODO
    this.mailerService.sendMail({
      to: 'bilwork.info@gmail.com',
      subject: 'Test',
      text: 'New application',
    });
    if (args.notificationOnMail) {
      this.mailerService.sendMail({
        to: user.email,
        subject: 'Created Application',
        text: 'Application pending',
      });
    }
    return await this.applicationRepository.save({
      date: args.date,
      place: args.place,
      user: user,
    });
  }

  async delete(id: string) {
    return await this.applicationRepository.delete(id);
  }

  async update(args: UpdateOneApplicationArgs) {
    const { id, ...updateArgs } = args;
    const application = await this.applicationRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    this.mailerService.sendMail({
      to: application.user.email,
      subject: 'Change Application',
      text: `Application ${updateArgs.status ?? application.status} at place: ${
        updateArgs.place ?? application.place
      } on time ${updateArgs.date ?? application.date} `,
    });
    return await this.applicationRepository.update(id, updateArgs);
  }
}
