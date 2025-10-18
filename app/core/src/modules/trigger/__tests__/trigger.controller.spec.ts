import { Test, TestingModule } from '@nestjs/testing';
import { TriggerController } from '../trigger.controller';
import { TriggerService } from '../trigger.service';

describe('TriggerController', () => {
  let controller: TriggerController;
  let service: any;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TriggerController],
      providers: [{ provide: TriggerService, useValue: service }],
    }).compile();

    controller = module.get<TriggerController>(TriggerController);
  });

  it('should create trigger', async () => {
    const workflowId = 'w1';
    const dto = { name: 'Trigger 1', type: 'webhook', config: {} };
    service.create.mockResolvedValue({ id: 't1', ...dto, workflowId });

    const result = await controller.create(workflowId, dto);

    expect(service.create).toHaveBeenCalledWith(workflowId, dto);
    expect(result.id).toBe('t1');
  });

  it('should get all triggers for workflow', async () => {
    const workflowId = 'w1';
    const triggers = [{ id: 't1' }];
    service.findAll.mockResolvedValue(triggers);

    const result = await controller.findAll(workflowId);

    expect(service.findAll).toHaveBeenCalledWith(workflowId);
    expect(result).toEqual(triggers);
  });

  it('should get one trigger', async () => {
    const trigger = { id: 't1' };
    service.findOne.mockResolvedValue(trigger);

    const result = await controller.findOne('t1');

    expect(service.findOne).toHaveBeenCalledWith('t1');
    expect(result).toEqual(trigger);
  });

  it('should update a trigger', async () => {
    const dto = { name: 'Updated Trigger' };
    service.update.mockResolvedValue({ id: 't1', ...dto });

    const result = await controller.update('t1', dto);

    expect(service.update).toHaveBeenCalledWith('t1', dto);
    expect(result.name).toBe('Updated Trigger');
  });

  it('should remove a trigger', async () => {
    service.remove.mockResolvedValue({ id: 't1' });

    const result = await controller.remove('t1');

    expect(service.remove).toHaveBeenCalledWith('t1');
    expect(result.id).toBe('t1');
  });
});
