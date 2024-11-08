import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  //create a param decorator with custom values
  (data: never, context: ExecutionContext) => {
    // accept any kind of data, context is same as Request but more general, not just http requests.
    //data:never means decorator doesnt take any arguments
    const request = context.switchToHttp().getRequest; // convert context to http object and get the request
  },
);
