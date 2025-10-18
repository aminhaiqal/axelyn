import { PartialType } from '@nestjs/mapped-types';
import { CreateTriggerDto } from './create-trigger.dto';

export class UpdateTriggerDto extends PartialType(CreateTriggerDto) {}
