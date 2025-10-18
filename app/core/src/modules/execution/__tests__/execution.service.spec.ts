import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionService } from '../execution.service';
import { PrismaService } from '../../../common/prisma.service';
import { NodeService } from '../../node/node.service';
import { ExecutionStatusEnum } from '../enum/execution-status.enum';

describe('ExecutionService', () => {
  let service: ExecutionService;
  let prisma: any;
  let nodeService: any;

  beforeEach(async () => {
    prisma = {
      execution: {
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    nodeService = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExecutionService,
        { provide: PrismaService, useValue: prisma },
        { provide: NodeService, useValue: nodeService },
      ],
    }).compile();

    service = module.get<ExecutionService>(ExecutionService);
  });

  it('should create execution and run nodes successfully', async () => {
    const workflowId = 'w1';
    const userId = 'u1';
    const description = 'Test execution';

    const mockNodes = [
      { id: 'n1', name: 'Node 1', type: 'llm', config: {}, nextNodeId: null },
    ];

    nodeService.findAll.mockResolvedValue(mockNodes);
    prisma.execution.create.mockResolvedValue({
      id: 'e1',
      workflowId,
      userId,
      name: 'Execution for workflow w1',
      description,
      status: ExecutionStatusEnum.RUNNING,
      logs: [],
      result: {},
    });
    prisma.execution.update.mockResolvedValue({});

    const result = await service.executeWorkflow(workflowId, userId, description);

    expect(prisma.execution.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        workflowId,
        userId,
        description,
        status: ExecutionStatusEnum.RUNNING,
      }),
    }));

    expect(nodeService.findAll).toHaveBeenCalledWith(workflowId);
    expect(prisma.execution.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'e1' },
      data: expect.objectContaining({
        status: ExecutionStatusEnum.SUCCESS,
      }),
    }));

    expect(result.logs).toHaveLength(1);
    expect(result.logs[0].name).toBe('Node 1');
  });

  it('should fail execution if no nodes found', async () => {
    nodeService.findAll.mockResolvedValue([]);

    prisma.execution.create.mockResolvedValue({
      id: 'e2',
      workflowId: 'w1',
      userId: 'u1',
      name: 'Execution for workflow w1',
      status: ExecutionStatusEnum.RUNNING,
      logs: [],
      result: {},
    });

    await expect(service.executeWorkflow('w1', 'u1')).rejects.toThrow('No nodes found');

    expect(prisma.execution.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'e2' },
      data: expect.objectContaining({
        status: ExecutionStatusEnum.FAILED,
      }),
    }));
  });

  it('should mark execution as FAILED if a node throws an error', async () => {
    const workflowId = 'w1';
    const userId = 'u1';

    const failingNode = [
      { id: 'n1', name: 'Fail Node', type: 'llm', config: {}, nextNodeId: null },
    ];

    nodeService.findAll.mockResolvedValue(failingNode);

    prisma.execution.create.mockResolvedValue({
      id: 'e3',
      workflowId,
      userId,
      name: 'Execution for workflow w1',
      status: ExecutionStatusEnum.RUNNING,
      logs: [],
      result: {},
    });

    // Override runLLM to throw error
    jest.spyOn(service as any, 'runLLM').mockImplementation(() => {
      throw new Error('LLM failed');
    });

    await expect(service.executeWorkflow(workflowId, userId)).rejects.toThrow('LLM failed');

    expect(prisma.execution.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'e3' },
      data: expect.objectContaining({
        status: ExecutionStatusEnum.FAILED,
        logs: expect.arrayContaining([expect.objectContaining({ error: 'LLM failed' })]),
      }),
    }));
  });
});
