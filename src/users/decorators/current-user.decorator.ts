import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Session } from 'inspector/promises';

export const CurrentUser = createParamDecorator(
  //create a param decorator with custom values
  (data: never, context: ExecutionContext) => {
    //ExecutionContext is same as Request but it also supports websocket,geodata etc so fancy syntax
    // this decorator just reads currentuser part of the request, currentuser part comes from our custom interceptor
    // accept any kind of data, context is same as Request but more general, not just http requests.
    //data:never means decorator doesnt take any arguments
    const request = context.switchToHttp().getRequest(); // convert context to http object and get the request
    // thanks to our custom interceptor our request object has a currentUser info. So we can grab id from it
    console.log(request.session.currentUser);

    return request.session.currentUser;
  },
);
