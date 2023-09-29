import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Enable JSON parsing
  app.use(json());

  app.useWebSocketAdapter(new IoAdapter(app));

  // Enable URL-encoded form parsing
  app.use(urlencoded({ extended: true }));

  // Configure swagger
  const config = new DocumentBuilder()
      .setTitle('Livestream API')
      .setDescription('A project like Google Meet')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(parseInt(process.env.PORT) || 3000, "0.0.0.0");
}
bootstrap();
