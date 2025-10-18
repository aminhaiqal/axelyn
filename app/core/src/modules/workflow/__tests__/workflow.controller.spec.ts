import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowController } from '../workflow.controller';
import { WorkflowService } from '../workflow.service';

describe('WorkflowController', () => {
  let controller: WorkflowController;
  let service: WorkflowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowController],
      providers: [
        {
          provide: WorkflowService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WorkflowController>(WorkflowController);
    service = module.get<WorkflowService>(WorkflowService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on service', async () => {
    const dto = { name: 'Workflow 1' };
    const userId = 'user1';
    (service.create as jest.Mock).mockResolvedValue({ id: 'w1', ...dto });
    const result = await controller.create(userId, dto);
    expect(service.create).toHaveBeenCalledWith(userId, dto);
    expect(result).toEqual({ id: 'w1', ...dto });
  });
});
