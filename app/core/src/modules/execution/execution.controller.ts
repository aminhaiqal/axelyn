import { Controller, Post, Param, Body } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { CreateExecutionDto } from './dto/create-execution.dto';

@Controller('executions')
export class ExecutionController {
  constructor(private execService: ExecutionService) {}

  @Post('workflow/:workflowId/run')
  async runWorkflow(
    @Param('workflowId') workflowId: string,
    @Body() dto: CreateExecutionDto,
  ) {
    return this.execService.executeWorkflow(
      workflowId,
      dto.userId,
      dto.description,
      dto.input,
    );
  }
}
