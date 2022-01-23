import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { SequelizeOptions, LdapOptions } from '@sample/api-config';
import {
  UserModule,
  AnnouncementModule,
} from '@sample/api-repositories'

import { PopulateModule } from '@sample/api-populate';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [LdapOptions],
    }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeOptions,
    }),
    AnnouncementModule,
    UserModule,
    PopulateModule,
  ],
})
export class AppModule {}
