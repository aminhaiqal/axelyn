import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NodeService } from './node.service';
import { CreateNodeDto, UpdateNodeDto } from './dto';

@Controller('nodes')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Post()
  create(@Body('workflowId') workflowId: string, @Body() dto: CreateNodeDto) {
    return this.nodeService.create(workflowId, dto);
  }

  @Get(':workflowId')
  findAll(@Param('workflowId') workflowId: string) {
    return this.nodeService.findAll(workflowId);
  }

  @Get('node/:id')
  findOne(@Param('id') id: string) {
    return this.nodeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNodeDto) {
    return this.nodeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodeService.remove(id);
  }
}
