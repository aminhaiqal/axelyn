import { IsString, IsOptional } from 'class-validator';

export class CreateTriggerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  type: string; // e.g., "webhook", "schedule", "manual"

  config: any; // you can use Json type in DTO or add validation later
}
