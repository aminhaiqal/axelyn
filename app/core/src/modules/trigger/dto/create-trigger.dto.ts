import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateTriggerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  type: string; // "webhook", "schedule", "manual"

  @IsObject()
  config: Record<string, any>; // JSON config for webhook, cron, etc.

  @IsString()
  workflowId: string; // ID of the workflow this trigger belongs to
}
