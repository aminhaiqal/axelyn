import { Module } from '@nestjs/common';
import { UserController } from './modules/user/user.controller'
import { PrismaService } from './common/prisma.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
