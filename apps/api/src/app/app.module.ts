import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const imports = [
];

// port:4200でdistを配信する
// apiのリクエストはbootstrapでlistenするので除外
if (process.env.STATIC_SERVE) {
  imports.push(ServeStaticModule.forRoot({
    rootPath: path.join(__dirname, '..', 'angular-sample'),
    exclude: ['/api*'] // api url
  }));
}

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
