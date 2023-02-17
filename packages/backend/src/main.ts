import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // Validator initialization
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Api documentation config
  const config = new DocumentBuilder()
    .setTitle('Nest + Orm')
    .setDescription('The nest js API description')
    .setVersion('1.0')
    .addTag('nest')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'JWT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true, limit: '2mb' }));

  app.use(
    session({
      cookie: {
        maxAge: 60000 * 60 * 24
      },
      secret: process.env.SECRET_COOKIE,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(+process.env.PORT || 5000);
}

bootstrap();
