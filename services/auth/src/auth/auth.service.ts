import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/graphql/user.entity';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async validateUserById(userId: string): Promise<User | null> {
    return this.userService.findById(userId);
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessTokenPayload = { userId: user.id };
    const refreshTokenPayload = { userId: user.id, tokenType: 'refresh' };

    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      expiresIn: '1m',
    });
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      expiresIn: '7d',
    });

    // await this.sessionService.create({ user, refreshToken });

    return { accessToken, refreshToken };
  }
}
