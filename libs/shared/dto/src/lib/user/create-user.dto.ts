import {
  ApiProperty,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsDateString,
} from '../decorators-nest';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;
}
