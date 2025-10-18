import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateExecutionDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  input?: Record<string, any>; // optional input for nodes
}
