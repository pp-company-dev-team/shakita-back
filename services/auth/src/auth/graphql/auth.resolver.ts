import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginArgs } from './args/LoginArgs';
import { Tokens } from './models/Tokens';
import { UserService } from 'src/user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Tokens)
  async login(@Args() args: LoginArgs): Promise<Tokens> {
    const user = await this.authService.validateUser(args.email, args.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.generateToken(user);
    return { token };
  }

  @Mutation(() => Tokens)
  async register(@Args() args: LoginArgs): Promise<Tokens> {
    const user = await this.userService.create(args);
    if (!user) {
      throw new BadRequestException();
    }
    const token = await this.authService.generateToken(user);
    return { token };
  }

  // TODO
  // @Query()
  // @UseGuards(AuthGuard())
  // profile(@Request() req) {
  //   return req.user;
  // }
}
