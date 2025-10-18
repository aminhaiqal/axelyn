import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { TriggerService } from './trigger.service';
import { TriggerController } from './trigger.controller';

@Module({
  imports: [],
  controllers: [TriggerController],
  providers: [TriggerService, PrismaService],
  exports: [TriggerService],
})
export class TriggerModule {}
