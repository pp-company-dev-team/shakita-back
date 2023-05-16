import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtGuard } from './guard/jwt.guard';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtGuard: JwtGuard) {}
  private publicRoutes: string[] = ['/'];

  async use(req: Request, res: Response, next: NextFunction) {
    const isPublicRoute = true;
    // this.publicRoutes.includes(req.path); //req.baseUrl

    if (isPublicRoute) {
      return next();
    }

    const context = new ExecutionContextHost([req, res, next]);

    await this.jwtGuard.canActivate(context);
    return next();
  }
}
