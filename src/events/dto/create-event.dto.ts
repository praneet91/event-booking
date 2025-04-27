import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  capacity: number;
} 