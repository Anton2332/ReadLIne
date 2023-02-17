import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrimMiddleware } from './modules/common/middlewares/trim.middleware';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AppController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...[TrimMiddleware]).forRoutes('/');
  }
}
