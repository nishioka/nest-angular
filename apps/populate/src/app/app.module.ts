import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import {
  UserModule,
  AnnouncementModule,
} from '@sample/api-repositories'

import { PopulateAnnouncementService } from './service/announcement.populate.service';
import { PopulateUserService } from './service/user.populate.service';

import { SequelizeOptions } from '../environments';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
    useClass: SequelizeOptions,
    }),
    AnnouncementModule,
    UserModule,
  ],
  providers: [
    PopulateAnnouncementService,
    PopulateUserService
  ],
  exports: [
    PopulateAnnouncementService,
    PopulateUserService
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly populateAnnouncementService: PopulateAnnouncementService,
    private readonly populateUserService: PopulateUserService,
  ) {}

  async onModuleInit() {
    await this.populateUserService.populate();
    await this.populateAnnouncementService.populate();
  }
}
