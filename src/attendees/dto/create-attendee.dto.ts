import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAttendeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
} 