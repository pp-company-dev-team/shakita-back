import { Resolver, Query, Args } from '@nestjs/graphql';
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
    const user = await this.applicationService.findById(args.id);
    return user;
  }

  @Query(() => Application)
  async createOneApplication(
    @Args() args: CreateOneApplicationArgs,
  ): Promise<Application> {
    const user = await this.applicationService.create(args);
    return user;
  }

  @Query(() => Application)
  async deleteOneApplication(@Args() args: UniqueArgs): Promise<DeleteResult> {
    const user = await this.applicationService.delete(args.id);
    return user;
  }

  @Query(() => Application)
  async updateOneApplication(
    @Args() args: UpdateOneApplicationArgs,
  ): Promise<UpdateResult> {
    const user = await this.applicationService.update(args);
    return user;
  }
}
