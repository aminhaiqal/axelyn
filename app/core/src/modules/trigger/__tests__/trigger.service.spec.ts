import { Test, TestingModule } from '@nestjs/testing';
import { TriggerService } from '../trigger.service';
import { PrismaService } from '../../../common/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('TriggerService', () => {
  let service: TriggerService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      trigger: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TriggerService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<TriggerService>(TriggerService);
  });

  it('should create a trigger', async () => {
    const workflowId = 'w1';
    const dto = { name: 'Trigger 1', type: 'webhook', config: {} };
    prisma.trigger.create.mockResolvedValue({ id: 't1', ...dto, workflowId });

    const result = await service.create(workflowId, dto);

    expect(prisma.trigger.create).toHaveBeenCalledWith({
      data: { ...dto, workflowId },
    });
    expect(result.id).toBe('t1');
  });

  it('should find all triggers for a workflow', async () => {
    const workflowId = 'w1';
    const triggers = [{ id: 't1' }, { id: 't2' }];
    prisma.trigger.findMany.mockResolvedValue(triggers);

    const result = await service.findAll(workflowId);

    expect(prisma.trigger.findMany).toHaveBeenCalledWith({ where: { workflowId } });
    expect(result).toEqual(triggers);
  });

  it('should find one trigger', async () => {
    const trigger = { id: 't1', name: 'Trigger 1' };
    prisma.trigger.findUnique.mockResolvedValue(trigger);

    const result = await service.findOne('t1');

    expect(prisma.trigger.findUnique).toHaveBeenCalledWith({ where: { id: 't1' } });
    expect(result).toEqual(trigger);
  });

  it('should throw NotFoundException if trigger not found', async () => {
    prisma.trigger.findUnique.mockResolvedValue(null);

    await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
  });

  it('should update a trigger', async () => {
    const dto = { name: 'Updated Trigger' };
    prisma.trigger.update.mockResolvedValue({ id: 't1', ...dto });

    const result = await service.update('t1', dto);

    expect(prisma.trigger.update).toHaveBeenCalledWith({ where: { id: 't1' }, data: dto });
    expect(result.name).toBe('Updated Trigger');
  });

  it('should remove a trigger', async () => {
    prisma.trigger.delete.mockResolvedValue({ id: 't1' });

    const result = await service.remove('t1');

    expect(prisma.trigger.delete).toHaveBeenCalledWith({ where: { id: 't1' } });
    expect(result.id).toBe('t1');
  });
});
