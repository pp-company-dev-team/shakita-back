import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from './user.entity';
import { CreateOneUserArgs } from './args/CreateOneUserArgs';
import { UpdateOneUserArgs } from './args/UpdateOneUserArgs';
import { UniqueArgs } from 'src/graphql/args/UniqueArgs';
import { SuccessOutput } from 'src/graphql/dto/SuccessOutput';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async findOneUser(@Args() args: UniqueArgs): Promise<User> {
    const user = await this.userService.findById(args.id);
    return user;
  }

  @Mutation(() => User)
  async createOneUser(@Args() args: CreateOneUserArgs): Promise<User> {
    const user = await this.userService.create(args);
    return user;
  }

  @Mutation(() => SuccessOutput)
  async deleteOneUser(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    await this.userService.delete(args.id);
    return { success: true };
  }

  @Mutation(() => User)
  async updateOneUser(@Args() args: UpdateOneUserArgs): Promise<SuccessOutput> {
    await this.userService.update(args);
    return { success: true };
  }
}
