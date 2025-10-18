import { Test, TestingModule } from '@nestjs/testing';
import { NodeController } from '../node.controller';
import { NodeService } from '../node.service';
import { CreateNodeDto, UpdateNodeDto } from '../dto';

describe('NodeController', () => {
  let controller: NodeController;
  let service: NodeService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeController],
      providers: [{ provide: NodeService, useValue: mockService }],
    }).compile();

    controller = module.get<NodeController>(NodeController);
    service = module.get<NodeService>(NodeService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create', async () => {
    const dto: CreateNodeDto = { name: 'Node 1', type: 'llm' };
    mockService.create.mockResolvedValue({ id: 'n1', ...dto, workflowId: 'w1' });

    const result = await controller.create('w1', dto);
    expect(result.id).toBe('n1');
    expect(mockService.create).toHaveBeenCalledWith('w1', dto);
  });

  it('should call findAll', async () => {
    mockService.findAll.mockResolvedValue([{ id: 'n1', name: 'Node 1' }]);
    const result = await controller.findAll('w1');
    expect(result.length).toBe(1);
    expect(mockService.findAll).toHaveBeenCalledWith('w1');
  });

  it('should call findOne', async () => {
    mockService.findOne.mockResolvedValue({ id: 'n1', name: 'Node 1' });
    const result = await controller.findOne('n1');
    expect(result.id).toBe('n1');
    expect(mockService.findOne).toHaveBeenCalledWith('n1');
  });

  it('should call update', async () => {
    const dto: UpdateNodeDto = { name: 'Updated Node' };
    mockService.update.mockResolvedValue({ id: 'n1', ...dto });
    const result = await controller.update('n1', dto);
    expect(result.name).toBe('Updated Node');
    expect(mockService.update).toHaveBeenCalledWith('n1', dto);
  });

  it('should call remove', async () => {
    mockService.remove.mockResolvedValue({ id: 'n1' });
    const result = await controller.remove('n1');
    expect(result.id).toBe('n1');
    expect(mockService.remove).toHaveBeenCalledWith('n1');
  });
});
