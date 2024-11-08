import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  // guard implements default guard
  canActivate(context: ExecutionContext) {
    // same as Request object
    const request = context.switchToHttp().getRequest(); // get request object
    return request.session.id; // check session property has id, if it does its TRUE so you are allowed
    // if not its FALSE so no authorized!
  }
}
