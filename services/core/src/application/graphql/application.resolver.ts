import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ApplicationService } from '../application.service';
import { Application } from './application.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateOneApplicationArgs } from './args/CreateOneApplicationArgs';
import { UpdateOneApplicationArgs } from './args/UpdateOneApplicationArgs';
import { UniqueArgs } from 'src/graphql/args/UniqueArgs';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private applicationService: ApplicationService) {}

  @Query(() => Application, { nullable: true })
  async findOneApplication(@Args() args: UniqueArgs): Promise<Application> {
    const application = await this.applicationService.findById(args.id);
    return application;
  }

  @Mutation(() => Application)
  async createOneApplication(
    @Args() args: CreateOneApplicationArgs,
  ): Promise<Application> {
    console.log(args);
    const application = await this.applicationService.create(args);
    return application;
  }

  @Mutation(() => Application)
  async deleteOneApplication(@Args() args: UniqueArgs): Promise<DeleteResult> {
    const application = await this.applicationService.delete(args.id);
    return application;
  }

  @Mutation(() => Application)
  async updateOneApplication(
    @Args() args: UpdateOneApplicationArgs,
  ): Promise<UpdateResult> {
    const application = await this.applicationService.update(args);
    return application;
  }
}
