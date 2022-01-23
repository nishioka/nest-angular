import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';

import { database as configDev } from './environment.dev';
import { database as configProd } from './environment.prod';

export class SequelizeOptions implements SequelizeOptionsFactory {
  config;

  createSequelizeOptions(): SequelizeModuleOptions {
    if (process.env.NODE_ENV === 'production') {
      this.config = configProd;
    } else if (process.env.NODE_ENV === 'development') {
      this.config = configDev;
    }
    if (process.env.DB_SYNC_FORCE) {
      this.config.sync = {
        force: true,
      };
    }
    this.config.autoLoadModels = true;

    return this.config;
  }
}
