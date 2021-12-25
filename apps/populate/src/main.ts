import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { PopulateService } from '@sample/api-populate';
 
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const populateService = app.get<PopulateService>(PopulateService);
  await populateService.init();
  await app.close();
}
bootstrap();
