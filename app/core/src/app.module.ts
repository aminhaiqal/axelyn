import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { BusinessModule } from './modules/business/business.module';
import { RateLimitMiddleware } from './common/middleware/rate-limit-middleware';

@Module({
  imports: [BusinessModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('api/business');
  }
}
