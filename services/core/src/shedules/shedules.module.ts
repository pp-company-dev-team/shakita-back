import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { ApplicationService } from 'src/application/application.service';
import { ShedulesService } from './shedule.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), ApplicationModule],
  providers: [ApplicationService, ShedulesService],
})
export class ShedulesModule {}
