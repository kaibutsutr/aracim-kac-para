import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';

import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.session || {}; // return empty instead of undefined
    if (id) {
      const user = await this.usersService.findOne(id);
      req.currentUser = user; // assing user as current user in session
    }
    next(); // call next function
  }
}
