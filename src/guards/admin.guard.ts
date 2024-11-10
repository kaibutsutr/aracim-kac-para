import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

export class AdminGuard implements CanActivate {
  // guard implements default guard
  canActivate(context: ExecutionContext) {
    // same as Request object
    const request = context.switchToHttp().getRequest(); // get request object
    return request.session.id;
  }
}
