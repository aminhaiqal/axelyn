import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { NodeService } from './node.service';
import { Prisma } from '../../../../@axon/generated/prisma';

@Controller('nodes')
export class NodeController {
  constructor(private nodeService: NodeService) {}

  @Get() findAll(@Query('workflowId') workflowId?: string) { return this.nodeService.findAll(workflowId); }
  @Get(':id') findOne(@Param('id') id: string) { return this.nodeService.findOne(id); }
  @Post() create(@Body() data: Prisma.NodeCreateInput) { return this.nodeService.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: Prisma.NodeUpdateInput) { return this.nodeService.update(id, data); }
  @Delete(':id') remove(@Param('id') id: string) { return this.nodeService.remove(id); }
}
