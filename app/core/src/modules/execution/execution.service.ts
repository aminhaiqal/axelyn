import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { Prisma, ExecutionStatus } from '../../../../@axon/generated/prisma';

@Injectable()
export class ExecutionService {
  constructor(private prisma: PrismaService) {}

  async runWorkflow(userId: string, workflowId: string, input: any) {
    // 1. Create execution record
    const execution = await this.prisma.execution.create({
      data: {
        workflowId,
        userId,
        status: ExecutionStatus.RUNNING,
        logs: { input },
      },
    });

    // 2. Fetch workflow nodes ordered by position
    const nodes = await this.prisma.node.findMany({
      where: { workflowId },
      orderBy: { positionX: 'asc' },
    });

    let output = input;

    for (const node of nodes) {
      // Here we do MVP-level logic: pseudo GPT call or decision
      switch (node.type) {
        case 'email_read':
          output.email = input.email; // simulate reading email
          break;
        case 'classify_intent':
          output.intent = 'question'; // MVP: always classify as question
          break;
        case 'reply_auto':
          output.reply = 'Suggested auto-reply';
          break;
        case 'assign_human':
          output.assignedTo = 'human_agent';
          break;
      }

      // Log per node execution
      await this.prisma.execution.update({
        where: { id: execution.id },
        data: {
          logs: {
            ...(typeof execution.logs === 'object' && execution.logs !== null ? execution.logs : {}),
            [node.type]: output,
          },
        },
      });
    }

    // 3. Mark workflow as finished
    return this.prisma.execution.update({
      where: { id: execution.id },
      data: { status: ExecutionStatus.SUCCESS, result: output, finishedAt: new Date() },
    });
  }
}
