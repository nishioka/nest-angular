import {
  ApiProperty,
  IsOptional,
  IsString,
  IsDateString,
  Length,
} from '../decorators-nest';

// import { User } from '../../users/user.entity';

export class CreateAnnouncementDto {
  @ApiProperty()
  @IsString()
  @Length(1, 256)
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  authorEmployeeNo?: string;

  @ApiProperty()
  @IsDateString()
  date: string;
}
