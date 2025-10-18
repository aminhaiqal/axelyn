import { Module } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { TriggerController } from './trigger.controller';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [TriggerController],
  providers: [TriggerService, PrismaService],
})
export class TriggerModule {}
