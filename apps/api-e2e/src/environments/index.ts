import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';

import { environment as configDev } from './environment.dev';

export class SequelizeOptions implements SequelizeOptionsFactory {
  config;

  createSequelizeOptions(): SequelizeModuleOptions {
    this.config = configDev;
    if (process.env.DB_SYNC_FORCE) {
      this.config['database']['sync'] = {
        force: true,
      };
    }
    this.config['database']['autoLoadModels'] = true;

    return this.config.database;
  }
}
