import { Module } from '@nestjs/common';

import {
  UserModule,
  AnnouncementModule,
} from '@sample/api-repositories'
  
import { PopulateService } from './populate.service';
import { PopulateAnnouncementService } from './announcement.populate.service';
import { PopulateUserService } from './user.populate.service';

@Module({
  imports: [
    UserModule,
    AnnouncementModule,
  ],
  providers: [
    PopulateAnnouncementService,
    PopulateUserService,
    PopulateService,
  ],
  exports: [
    PopulateAnnouncementService,
    PopulateUserService,
    PopulateService,
  ],
})
export class PopulateModule {}
