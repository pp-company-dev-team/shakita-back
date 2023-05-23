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
  private publicMethods: string[] = ['login', 'register', 'refresh'];
  private supportMethods: string[] = ['__schema'];

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body?.query) {
      const ast = parse(req.body.query);

      let methodName: string | undefined;

      visit(ast, {
        OperationDefinition(node) {
          methodName = (
            node.selectionSet.selections[0] as SelectionNode & {
              name: { value: string };
            }
          ).name.value;
        },
      });

      if (!methodName) {
        throw new BadRequestException();
      }

      if (
        this.publicMethods.includes(methodName) ||
        this.supportMethods.includes(methodName)
      ) {
        return next();
      }

      const context = new ExecutionContextHost([req, res, next]);

      await this.jwtGuard.canActivate(context);
      return next();
    }

    return next();
  }
}
