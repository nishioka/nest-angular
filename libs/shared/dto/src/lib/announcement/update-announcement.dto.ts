import { ApiProperty, IsString, IsOptional, Length } from '../decorators-nest';

export class UpdateAnnouncementDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  @Length(1, 1024)
  content: string;
}
