import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { CreateTriggerDto, UpdateTriggerDto } from './dto';

@Controller('triggers')
export class TriggerController {
  constructor(private triggerService: TriggerService) {}

  @Post('workflow/:workflowId')
  create(@Param('workflowId') workflowId: string, @Body() dto: CreateTriggerDto) {
    return this.triggerService.create(workflowId, dto);
  }

  @Get('workflow/:workflowId')
  findAll(@Param('workflowId') workflowId: string) {
    return this.triggerService.findAll(workflowId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.triggerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTriggerDto) {
    return this.triggerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.triggerService.remove(id);
  }
}
