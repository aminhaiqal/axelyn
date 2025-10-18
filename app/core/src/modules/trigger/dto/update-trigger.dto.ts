import { IsString, IsOptional } from 'class-validator';

export class UpdateTriggerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  config?: any;
}
