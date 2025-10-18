import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionController } from '../execution.controller';
import { ExecutionService } from '../execution.service';

describe('ExecutionController', () => {
  let controller: ExecutionController;
  let service: any;

  beforeEach(async () => {
    service = {
      executeWorkflow: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutionController],
      providers: [{ provide: ExecutionService, useValue: service }],
    }).compile();

    controller = module.get<ExecutionController>(ExecutionController);
  });

  it('should call executeWorkflow with correct parameters', async () => {
    const workflowId = 'w1';
    const dto = { userId: 'u1', description: 'desc', input: { foo: 'bar' } };

    service.executeWorkflow.mockResolvedValue({ success: true });

    const result = await controller.runWorkflow(workflowId, dto);

    expect(service.executeWorkflow).toHaveBeenCalledWith(
      workflowId,
      dto.userId,
      dto.description,
      dto.input,
    );

    expect(result).toEqual({ success: true });
  });
});
