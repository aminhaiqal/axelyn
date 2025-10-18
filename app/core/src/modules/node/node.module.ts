import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [NodeController],
  providers: [NodeService, PrismaService],
})
export class NodeModule {}
