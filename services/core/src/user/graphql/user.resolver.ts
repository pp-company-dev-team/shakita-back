import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateOneUserArgs } from './args/CreateOneUserArgs';
import { UpdateOneUserArgs } from './args/UpdateOneUserArgs';
import { UniqueArgs } from 'src/graphql/args/UniqueArgs';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async findOneUser(@Args() args: UniqueArgs): Promise<User> {
    const user = await this.userService.findById(args.id);
    return user;
  }

  // TODO maybe del
  @Mutation(() => User)
  async createOneUser(@Args() args: CreateOneUserArgs): Promise<User> {
    const user = await this.userService.create(args);
    return user;
  }

  @Mutation(() => User)
  async deleteOneUser(@Args() args: UniqueArgs): Promise<DeleteResult> {
    const user = await this.userService.delete(args.id);
    return user;
  }

  @Mutation(() => User)
  async updateOneUser(@Args() args: UpdateOneUserArgs): Promise<UpdateResult> {
    const user = await this.userService.update(args);
    return user;
  }
}
