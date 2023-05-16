import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from './auth.service';
// import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // private readonly authService: AuthService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key', // Замени на свой секретный ключ
    });
  }

  async validate(payload) {
    console.log('validate', payload);
    // const user = await this.authService.validateUserById(payload.userId);
    const user = false;
    if (!user) {
      throw new Error('Pizda');
      // В случае невалидного пользователя можешь выбросить исключение UnauthorizedException
    }
    return user;
  }
}
