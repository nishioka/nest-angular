import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import {
  UserModule,
  AnnouncementModule,
} from '@sample/api-repositories'

import { PopulateModule } from '@sample/api-populate';

import { SequelizeOptions } from '../environments';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeOptions,
    }),
    AnnouncementModule,
    UserModule,
    PopulateModule,
  ],
})
export class AppModule {
}
