import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { CreateTriggerDto } from './dto/create-trigger.dto';
import { UpdateTriggerDto } from './dto/update-trigger.dto';

@Controller('triggers')
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @Get() findAll() { return this.triggerService.findAll(); }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.triggerService.findOne(id);
  }

  @Post() create(@Body() data: CreateTriggerDto) {
    return this.triggerService.create(data);
  }

  @Put(':id') update(@Param('id') id: string, @Body() data: UpdateTriggerDto) {
    return this.triggerService.update(id, data);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.triggerService.remove(id);
  }
}
