import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Announcement } from '@sample/api-models';

import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Announcement]), UserModule],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
