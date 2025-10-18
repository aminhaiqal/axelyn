import { Test, TestingModule } from '@nestjs/testing';
import { NodeService } from '../node.service';
import { PrismaService } from '../../../common/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateNodeDto, UpdateNodeDto } from '../dto';

describe('NodeService', () => {
  let service: NodeService;
  let prisma: PrismaService;

  const mockPrisma = {
    node: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<NodeService>(NodeService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a node', async () => {
      const workflowId = 'workflow1';
      const dto: CreateNodeDto = {
        name: 'Node 1',
        type: 'llm',
        config: { model: 'gpt-4' },
      };

      mockPrisma.node.create.mockResolvedValue({ id: 'n1', ...dto, workflowId });

      const result = await service.create(workflowId, dto);
      expect(mockPrisma.node.create).toHaveBeenCalledWith({
        data: { ...dto, workflowId, description: null, nextNodeId: null, label: null, positionX: 0, positionY: 0 },
      });
      expect(result.id).toBe('n1');
      expect(result.name).toBe(dto.name);
    });
  });

  describe('findAll', () => {
    it('should return all nodes for a workflow', async () => {
      const workflowId = 'workflow1';
      const nodes = [{ id: 'n1', name: 'Node 1' }];
      mockPrisma.node.findMany.mockResolvedValue(nodes);

      const result = await service.findAll(workflowId);
      expect(mockPrisma.node.findMany).toHaveBeenCalledWith({ where: { workflowId } });
      expect(result).toEqual(nodes);
    });
  });

  describe('findOne', () => {
    it('should return a node', async () => {
      const node = { id: 'n1', name: 'Node 1' };
      mockPrisma.node.findUnique.mockResolvedValue(node);

      const result = await service.findOne('n1');
      expect(result).toEqual(node);
      expect(mockPrisma.node.findUnique).toHaveBeenCalledWith({ where: { id: 'n1' } });
    });

    it('should throw NotFoundException if node not found', async () => {
      mockPrisma.node.findUnique.mockResolvedValue(null);
      await expect(service.findOne('n2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a node', async () => {
      const dto: UpdateNodeDto = { name: 'Updated Node' };
      const updatedNode = { id: 'n1', name: 'Updated Node' };
      mockPrisma.node.update.mockResolvedValue(updatedNode);

      const result = await service.update('n1', dto);
      expect(result).toEqual(updatedNode);
      expect(mockPrisma.node.update).toHaveBeenCalledWith({ where: { id: 'n1' }, data: dto });
    });
  });

  describe('remove', () => {
    it('should delete a node', async () => {
      const node = { id: 'n1', name: 'Node 1' };
      mockPrisma.node.delete.mockResolvedValue(node);

      const result = await service.remove('n1');
      expect(result).toEqual(node);
      expect(mockPrisma.node.delete).toHaveBeenCalledWith({ where: { id: 'n1' } });
    });
  });
});
