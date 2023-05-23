import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Application } from 'src/application/graphql/application.entity';
import { ApplicationStatus } from 'src/application/graphql/application.enum';

@Injectable()
export class ShedulesService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private mailerService: MailerService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async sendMailBeforTime() {
    const applications = await this.applicationRepository.findBy({
      status: ApplicationStatus.APPROVED,
    });
    // applications.forEach(() => {
    //     this.mailerService.sendMail({
    //         to: 'petr0v21vs@gmail.com',
    //         subject: 'Test',
    //         text: 'Test',
    //       });
    // })
  }
}
