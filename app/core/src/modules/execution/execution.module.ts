import { Module } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { ExecutionController } from './execution.controller';
import { PrismaService } from '../../common/prisma.service';
import { NodeService } from '../node/node.service';

@Module({
  controllers: [ExecutionController],
  providers: [ExecutionService, PrismaService, NodeService],
})
export class ExecutionModule {}