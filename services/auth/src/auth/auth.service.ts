import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  async generateToken(user: User): Promise<string> {
    const payload = { userId: user.id };
    return this.jwtService.signAsync(payload);
  }
}
