import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';

import { environment as configDev } from './environment.dev';
import { environment as configProd } from './environment.prod';

// const node_env = process.env.NODE_ENV;
export class SequelizeOptions implements SequelizeOptionsFactory {
  config;

  createSequelizeOptions(): SequelizeModuleOptions {
    if (process.env.NODE_ENV === 'production') {
      this.config = configProd;
    } else if (process.env.NODE_ENV === 'development') {
      this.config = configDev;
    }
    if (process.env.DB_SYNC_FORCE) {
      this.config['database']['sync'] = {
        force: true,
      };
    }
    this.config['database']['autoLoadModels'] = true;

    return this.config.database;
  }
}
