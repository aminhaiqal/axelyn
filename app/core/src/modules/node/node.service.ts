import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateNodeDto, UpdateNodeDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class NodeService {
  constructor(private prisma: PrismaService) {}

  async create(workflowId: string, dto: CreateNodeDto) {
    return this.prisma.node.create({
      data: {
        workflowId,
        name: dto.name,
        type: dto.type,
        config: dto.config ?? {} as any,
        description: dto.description ?? null,
        nextNodeId: dto.nextNodeId ?? null,
        label: dto.label ?? null,
        positionX: dto.positionX ?? 0,
        positionY: dto.positionY ?? 0,
      },
    });
  }

  async findAll(workflowId: string) {
    return this.prisma.node.findMany({ where: { workflowId } });
  }

  async findOne(id: string) {
    const node = await this.prisma.node.findUnique({ where: { id } });
    if (!node) throw new NotFoundException('Node not found');
    return node;
  }

  async update(id: string, dto: UpdateNodeDto) {
    return this.prisma.node.update({
      where: { id },
      data: {
        ...dto,
        config: dto.config ?? undefined, // undefined to avoid overwriting with null
      },
    });
  }

  async remove(id: string) {
    return this.prisma.node.delete({ where: { id } });
  }
}
