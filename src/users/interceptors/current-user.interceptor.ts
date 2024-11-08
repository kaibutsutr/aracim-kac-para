import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Session } from 'inspector/promises';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  // get the structure from Nestinterceptor and fill the needed data to make an interceptor
  constructor(private usersService: UsersService) {} // DI users service since we use this there.
  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    //intercept function
    const request = context.switchToHttp().getRequest();
    const { id } = request.session || {}; // get the id from session object and look for user in db via DI
    if (id) {
      // only do this if id exists, if not its not needed
      const user = await this.usersService.findOne(id); // find the user with given id
      request.session.currentUser = user; // put it in request object so our custom decorator can see it
    }
    return handler.handle(); // resume after interception
  }
}
