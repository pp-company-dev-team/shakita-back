import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtGuard } from './guard/jwt.guard';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { SelectionNode, parse, visit } from 'graphql';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtGuard: JwtGuard) {}
  private publicMethods: string[] = ['login', 'register'];

  async use(req: Request, res: Response, next: NextFunction) {
    const ast = parse(req.body?.query ?? null);

    let methodName: string | undefined;

    visit(ast, {
      OperationDefinition(node) {
        methodName = (
          node.selectionSet.selections[0] as SelectionNode & {
            name: { value: string };
          }
        ).name.value;
        console.log('methodName', methodName);
      },
    });

    if (!methodName) {
      throw new BadRequestException();
    }

    if (this.publicMethods.includes(methodName ?? 'wrongMethod')) {
      return next();
    }

    const context = new ExecutionContextHost([req, res, next]);

    await this.jwtGuard.canActivate(context);
    return next();
  }
}
