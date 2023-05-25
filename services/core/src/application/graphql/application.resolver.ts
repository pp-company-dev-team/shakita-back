import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ApplicationService } from '../application.service';
import { Application } from './application.entity';
import { CreateOneApplicationArgs } from './args/CreateOneApplicationArgs';
import { UpdateOneApplicationArgs } from './args/UpdateOneApplicationArgs';
import { UniqueArgs } from 'src/graphql/args/UniqueArgs';
import { SuccessOutput } from 'src/graphql/dto/SuccessOutput';

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
    const application = await this.applicationService.create({
      date: args.date,
      place: args.place,
    });
    return application;
  }

  @Mutation(() => SuccessOutput)
  async deleteOneApplication(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    await this.applicationService.delete(args.id);
    return { success: true };
  }

  @Mutation(() => Application)
  async updateOneApplication(
    @Args() args: UpdateOneApplicationArgs,
  ): Promise<SuccessOutput> {
    await this.applicationService.update(args);
    return { success: true };
  }
}
