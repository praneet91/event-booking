import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  bookedCount?: number;
} 