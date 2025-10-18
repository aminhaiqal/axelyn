import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { Prisma } from '../../../../@axon/generated/prisma';

@Injectable()
export class NodeService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.NodeCreateInput) { return this.prisma.node.create({ data }); }
  findAll(workflowId?: string) {
    return this.prisma.node.findMany({ where: workflowId ? { workflowId } : {}, orderBy: { positionX: 'asc' } });
  }
  findOne(id: string) { return this.prisma.node.findUnique({ where: { id } }); }
  update(id: string, data: Prisma.NodeUpdateInput) { return this.prisma.node.update({ where: { id }, data }); }
  remove(id: string) { return this.prisma.node.delete({ where: { id } }); }
}
