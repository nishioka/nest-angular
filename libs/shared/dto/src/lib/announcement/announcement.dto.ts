import { ApiProperty } from '../decorators-nest';

// import { Announcement } from '@sample/api-models';

import { UserDto } from '../user';

export class AnnouncementDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly authorId: string;

  @ApiProperty()
  readonly author: UserDto;

  @ApiProperty()
  readonly date: string;

  constructor(announcement: any) {
    if (announcement) {
      this.id = announcement.id;
      this.authorId = announcement.authorId;
      this.content = announcement.content;
      this.author = announcement.author && new UserDto(announcement.author);
      this.date = announcement.date.toISOString();
    }
  }
}
