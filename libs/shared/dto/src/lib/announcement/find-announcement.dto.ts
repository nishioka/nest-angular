import {
  ApiProperty,
  IsOptional,
  IsNumber,
  IsString,
  Length,
} from '../decorators-nest';

export class FindAnnouncementDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 256)
  readonly content?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly authorId?: string;
}
