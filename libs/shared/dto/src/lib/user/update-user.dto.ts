import {
  ApiProperty,
  IsOptional,
  IsString,
  IsDateString,
  IsEmail,
} from '../decorators-nest';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  employeeNo?: string;

  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;
}
