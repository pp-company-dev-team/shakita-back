import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginArgs } from './args/LoginArgs';
import { Tokens } from './models/Tokens';
import { UserService } from 'src/user/user.service';
import { RefreshArgs } from './args/RefreshArgs';
import { SessionService } from 'src/session/session.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Mutation(() => Tokens)
  async login(@Args() args: LoginArgs): Promise<Tokens> {
    const user = await this.authService.validateUser(args.email, args.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const tokens = await this.authService.generateTokens(user);
    return tokens;
  }

  @Mutation(() => Tokens)
  async register(@Args() args: LoginArgs): Promise<Tokens> {
    const user = await this.userService.create(args);
    if (!user) {
      throw new BadRequestException();
    }
    const tokens = await this.authService.generateTokens(user);
    return tokens;
  }

  @Query(() => Tokens)
  async refresh(@Args() args: RefreshArgs): Promise<Tokens> {
    const session = await this.sessionService.findSessionWithUserByRefreshToken(
      args.token,
    );
    if (!session) {
      throw new BadRequestException();
    }
    const tokens = await this.authService.generateTokens(session.user);
    // await this.sessionService.update({
    //   ...session,
    //   refreshToken: tokens.refreshToken,
    // });
    return tokens;
  }

  // TODO
  // @Query()
  // @UseGuards(AuthGuard())
  // profile(@Request() req) {
  //   return req.user;
  // }
}
