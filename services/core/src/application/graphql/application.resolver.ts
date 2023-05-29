import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ApplicationService } from '../application.service';
import { Application } from './application.entity';
import { CreateOneApplicationArgs } from './args/CreateOneApplicationArgs';
import { UpdateOneApplicationArgs } from './args/UpdateOneApplicationArgs';
import { UniqueArgs } from 'src/graphql/args/UniqueArgs';
import { SuccessOutput } from 'src/graphql/dto/SuccessOutput';
import {
  GetApplicationsArgs,
  GetApplicationsByDateArgs,
  GetApplicationsHystoryArgs,
} from './args/GetApplicationsArgs';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private applicationService: ApplicationService) {}

  @Query(() => Application, { nullable: true })
  async findOneApplication(@Args() args: UniqueArgs): Promise<Application> {
    const application = await this.applicationService.findById(args.id);
    return application;
  }

  @Query(() => [Application], { nullable: true })
  async findApplicationsByDate(
    @Args() args: GetApplicationsByDateArgs,
  ): Promise<Application[]> {
    console.log(args);
    return await this.applicationService.findByDateAndHours(args.date);
  }

  @Query(() => [Application], { nullable: true })
  async findApplications(
    @Args() args: GetApplicationsArgs,
  ): Promise<Application[]> {
    console.log(args);
    const applications = await this.applicationService.find(args);
    console.log(applications);
    return applications;
  }

  @Query(() => [Application], { nullable: true })
  async findApplicationsHistory(
    @Args() args: GetApplicationsHystoryArgs,
  ): Promise<Application[]> {
    console.log(args);
    const applications = await this.applicationService.getApplicationHistory(
      args.email,
    );
    console.log(applications);
    return applications;
  }

  @Mutation(() => Application)
  async createOneApplication(
    @Args() args: CreateOneApplicationArgs,
  ): Promise<Application> {
    const application = await this.applicationService.create(args);
    return application;
  }

  @Mutation(() => SuccessOutput)
  async deleteOneApplication(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    await this.applicationService.delete(args.id);
    return { success: true };
  }

  @Mutation(() => SuccessOutput)
  async updateOneApplication(
    @Args() args: UpdateOneApplicationArgs,
  ): Promise<SuccessOutput> {
    await this.applicationService.update(args);
    return { success: true };
  }
}
