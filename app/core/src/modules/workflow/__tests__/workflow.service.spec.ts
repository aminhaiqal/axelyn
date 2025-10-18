import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowService } from '../workflow.service';
import { PrismaService } from '../../../common/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('WorkflowService', () => {
  let service: WorkflowService;
  let prisma: PrismaService;

  // ✅ Mock Prisma methods
  const mockPrisma = {
    workflow: {
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
        WorkflowService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<WorkflowService>(WorkflowService);
    prisma = module.get<PrismaService>(PrismaService);

    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a workflow', async () => {
      const userId = 'user1';
      const dto = { name: 'Test Workflow', description: 'Desc' };

      // Mock Prisma response
      mockPrisma.workflow.create.mockResolvedValue({ ...dto, id: 'workflow1', userId });

      const result = await service.create(userId, dto);
      expect(mockPrisma.workflow.create).toHaveBeenCalledWith({
        data: { name: dto.name, description: dto.description, userId },
      });
      expect(result).toHaveProperty('id', 'workflow1');
      expect(result.name).toBe(dto.name);
    });
  });

  describe('findOne', () => {
    it('should return a workflow', async () => {
      const workflowMock = { id: 'w1', name: 'Test', nodes: [], triggers: [] };
      mockPrisma.workflow.findUnique.mockResolvedValue(workflowMock);

      const result = await service.findOne('w1');
      expect(mockPrisma.workflow.findUnique).toHaveBeenCalledWith({
        where: { id: 'w1' },
        include: { nodes: true, triggers: true },
      });
      expect(result).toEqual(workflowMock);
    });

    it('should throw NotFoundException if workflow does not exist', async () => {
      mockPrisma.workflow.findUnique.mockResolvedValue(null);

      await expect(service.findOne('w2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a workflow', async () => {
      const dto = { name: 'Updated', isActive: false };
      const updatedWorkflow = { id: 'w1', name: 'Updated', isActive: false };

      mockPrisma.workflow.update.mockResolvedValue(updatedWorkflow);

      const result = await service.update('w1', dto);
      expect(mockPrisma.workflow.update).toHaveBeenCalledWith({
        where: { id: 'w1' },
        data: dto,
      });
      expect(result).toEqual(updatedWorkflow);
    });
  });

  describe('remove', () => {
    it('should delete a workflow', async () => {
      mockPrisma.workflow.delete.mockResolvedValue({ id: 'w1', name: 'Test' });

      const result = await service.remove('w1');
      expect(mockPrisma.workflow.delete).toHaveBeenCalledWith({ where: { id: 'w1' } });
      expect(result).toHaveProperty('id', 'w1');
    });
  });
});
