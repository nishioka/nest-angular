import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';

import { SequelizeOptions, LdapOptions } from '@sample/api-config';
import { UserModule, AnnouncementModule } from '@sample/api-repositories';

const imports = [
  ConfigModule.forRoot({
    load: [LdapOptions],
  }),
  SequelizeModule.forRootAsync({
    useClass: SequelizeOptions,
  }),
  UserModule,
  AnnouncementModule,
];

// port:4200でdistを配信する
// apiのリクエストはbootstrapでlistenするので除外
if (process.env.STATIC_SERVE) {
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'angular-sample'),
      exclude: ['/api*'], // api url
    })
  );
}

@Module({
  imports,
  controllers: [],
  providers: [],
})
export class AppModule {}
