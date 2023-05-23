import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { Application } from './graphql/application.entity';
import { ApplicationResolver } from './graphql/application.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ApplicationService, ApplicationResolver],
  exports: [ApplicationService],
})
export class ApplicationModule {}
