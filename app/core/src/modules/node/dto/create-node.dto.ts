import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateNodeDto {
  @IsString()
  name: string;

  @IsString()
  type: string; // e.g., "http_request", "llm", "delay", "email"

  @IsOptional()
  config?: Record<string, any>;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  nextNodeId?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsNumber()
  positionX?: number;

  @IsOptional()
  @IsNumber()
  positionY?: number;
}
