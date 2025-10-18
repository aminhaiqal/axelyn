import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateTriggerDto, UpdateTriggerDto } from './dto';

@Injectable()
export class TriggerService {
  constructor(private prisma: PrismaService) {}

  async create(workflowId: string, dto: CreateTriggerDto) {
    return this.prisma.trigger.create({
      data: {
        ...dto,
        workflowId,
      },
    });
  }

  async findAll(workflowId: string) {
    return this.prisma.trigger.findMany({
      where: { workflowId },
    });
  }

  async findOne(id: string) {
    const trigger = await this.prisma.trigger.findUnique({ where: { id } });
    if (!trigger) throw new NotFoundException('Trigger not found');
    return trigger;
  }

  async update(id: string, dto: UpdateTriggerDto) {
    return this.prisma.trigger.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.trigger.delete({ where: { id } });
  }
}
