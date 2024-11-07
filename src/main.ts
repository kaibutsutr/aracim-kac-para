import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session'); // we need to write it like this, it has compatilability issues with TS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    // activate cookie-section
    cookieSession({
      keys: ['asdf'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }), // we want validation pipe for all requests
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
