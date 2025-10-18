import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateTriggerDto } from './dto/create-trigger.dto';
import { UpdateTriggerDto } from './dto/update-trigger.dto';

@Injectable()
export class TriggerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTriggerDto) {
    return this.prisma.trigger.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        config: data.config,
        workflow: { connect: { id: data.workflowId } },
      },
    });
  }

  async findAll() {
    return this.prisma.trigger.findMany({
      include: { workflow: true },
    });
  }

  async findOne(id: string) {
    const trigger = await this.prisma.trigger.findUnique({
      where: { id },
      include: { workflow: true },
    });

    if (!trigger) {
      throw new NotFoundException(`Trigger with id ${id} not found`);
    }

    return trigger;
  }

  async update(id: string, data: UpdateTriggerDto) {
    // Ensure trigger exists
    await this.findOne(id);

    return this.prisma.trigger.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        config: data.config,
        // only update workflow if workflowId is provided
        ...(data.workflowId && { workflow: { connect: { id: data.workflowId } } }),
      },
    });
  }

  async remove(id: string) {
    // Ensure trigger exists
    await this.findOne(id);

    return this.prisma.trigger.delete({
      where: { id },
    });
  }
}
