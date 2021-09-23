import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  Type,
  ValidationPipe,
  NestInterceptor,
} from '@nestjs/common';

type RunServerOptions = {
  // Main nest module.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appModule: Type<any>;

  port?: number;

  // Hook up global interceptors to app
  interceptors?: NestInterceptor[];
}

export const createApp = async (options: RunServerOptions) => {
  const app = await NestFactory.create(options.appModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  return app;
}

// apiはport:3333
// コンテンツは別に起動するng serveがport:4200
// (apiリクエストはproxy.conf.jsonで3333に転送される)
const startServer = async (app: INestApplication, port = 3333) => {
  let servicePort = port;
  if (process.env.STATIC_SERVE) {
    servicePort = parseInt(process.env.PORT || '') || port;
  }
  await app.listen(servicePort);
}

export const bootstrap = async (options: RunServerOptions) => {
  const app = await createApp(options);

  app.setGlobalPrefix('api');

  if (options.interceptors) {
    options.interceptors.forEach((interceptor) => {
      app.useGlobalInterceptors(interceptor);
    })
  }

  startServer(app, options.port);
}
