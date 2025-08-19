import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes any properties that are not in the DTO
      forbidNonWhitelisted: true, // throws an error if extra properties are present
      transform: false, // automatically transforms the incoming payload into an instance of the DTO class
    }),
  );

  // enable CORS for all origins (for development only)
  app.enableCors({
    origin: 'http://localhost:3000', // frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
