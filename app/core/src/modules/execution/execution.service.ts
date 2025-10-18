import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { NodeService } from '../node/node.service';
import { ExecutionStatusEnum } from './enum/execution-status.enum';

@Injectable()
export class ExecutionService {
  constructor(
    private prisma: PrismaService,
    private nodeService: NodeService,
  ) {}

  async executeWorkflow(
    workflowId: string,
    userId: string,
    description?: string,
    input?: Record<string, any>,
  ) {
    // 1. Create execution record
    const execution = await this.prisma.execution.create({
      data: {
        workflowId,
        userId,
        name: `Execution for workflow ${workflowId}`,
        description,
        status: ExecutionStatusEnum.RUNNING,
        logs: [],
        result: input ?? {},
      },
    });

    try {
      // 2. Fetch all nodes
      const nodes = await this.nodeService.findAll(workflowId);
      if (!nodes || nodes.length === 0) {
        throw new NotFoundException('No nodes found for this workflow');
      }

      // 3. Sort nodes by nextNodeId
      const sortedNodes = this.sortNodes(nodes);

      const logs = [];

      // 4. Execute nodes sequentially
      for (const node of sortedNodes) {
        let result;
        switch (node.type) {
          case 'llm':
            result = await this.runLLM(node.config, input);
            break;
          case 'http_request':
            result = await this.runHttp(node.config, input);
            break;
          case 'delay':
            result = await this.runDelay(node.config);
            break;
          case 'email':
            result = await this.runEmail(node.config, input);
            break;
          default:
            result = `Unknown node type: ${node.type}`;
        }
        logs.push({ nodeId: node.id, name: node.name, type: node.type, result });
      }

      // 5. Update execution record as SUCCESS
      await this.prisma.execution.update({
        where: { id: execution.id },
        data: { status: ExecutionStatusEnum.SUCCESS, logs, result: logs },
      });

      return { ...execution, logs };
    } catch (err) {
      // Update execution record as FAILED
      await this.prisma.execution.update({
        where: { id: execution.id },
        data: { status: ExecutionStatusEnum.FAILED, logs: [{ error: err.message }] },
      });
      throw err;
    }
  }

  // Simple linear sort using nextNodeId
  private sortNodes(nodes: any[]) {
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const sorted = [];
    const visited = new Set<string>();

    let current = nodes.find(n => !nodes.some(x => x.nextNodeId === n.id));
    while (current) {
      sorted.push(current);
      visited.add(current.id);
      current = current.nextNodeId ? nodeMap.get(current.nextNodeId) : null;
    }

    // Add any remaining disconnected nodes
    nodes.forEach(n => {
      if (!visited.has(n.id)) sorted.push(n);
    });

    return sorted;
  }

  // Placeholder node runners
  private async runLLM(config: any, input?: any) {
    return `LLM output for model ${config?.model || 'default'}`;
  }

  private async runHttp(config: any, input?: any) {
    return `HTTP request to ${config?.url || 'unknown'}`;
  }

  private async runDelay(config: any) {
    const ms = config?.ms || 1000;
    await new Promise(r => setTimeout(r, ms));
    return `Delayed for ${ms}ms`;
  }

  private async runEmail(config: any, input?: any) {
    return `Email sent to ${config?.to || 'unknown'}`;
  }
}
