import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { LoginArgs } from './args/LoginArgs';
import { Tokens } from './models/Tokens';
import { UserService } from 'src/user/user.service';
import { RefreshArgs } from './args/RefreshArgs';
import { SessionService } from 'src/session/session.service';
import * as UAParser from 'ua-parser-js';

@Resolver()
export class AuthResolver {
  private parser = new UAParser();

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Query(() => Tokens)
  async login(
    @Args() args: LoginArgs,
    @Context() context: any,
  ): Promise<Tokens> {
    const ip = context.req.ip; //TODO true ip
    const userAgent = context.req.headers['user-agent'];
    const parsedUserAgent = this.parser.setUA(userAgent).getResult();

    const user = await this.authService.validateUser(args.email, args.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const session =
      await this.sessionService.findSessionByUserIdAndIpAndUserAgent(
        user,
        context.req.ip,
        parsedUserAgent,
      );

    const tokens = await this.authService.generateTokens(user);

    if (session) {
      await this.authService.checkRefreshToken(session.refreshToken);

      await this.sessionService.update({
        ...session,
        user,
        refreshToken: tokens.refreshToken,
        ip,
        userAgent: parsedUserAgent,
      });
    } else {
      await this.sessionService.create({
        user,
        refreshToken: tokens.refreshToken,
        ip,
        userAgent: parsedUserAgent,
      });
    }

    return tokens;
  }

  @Mutation(() => Tokens)
  async register(
    @Args() args: LoginArgs,
    @Context() context: any,
  ): Promise<Tokens> {
    const user = await this.userService.create(args);
    if (!user) {
      throw new BadRequestException();
    }
    const ip = context.req.ip; //TODO true ip
    const userAgent = context.req.headers['user-agent'];
    const parsedUserAgent = this.parser.setUA(userAgent).getResult();

    const tokens = await this.authService.generateTokens(user);

    await this.sessionService.create({
      user,
      refreshToken: tokens.refreshToken,
      ip,
      userAgent: parsedUserAgent,
    });

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

    await this.authService.checkRefreshToken(session.refreshToken);

    const tokens = await this.authService.generateTokens(session.user);

    await this.sessionService.update({
      ...session,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
}
