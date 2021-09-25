import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  Type,
  ValidationPipe,
  NestInterceptor,
} from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as yargs from 'yargs';

import { InfraModule } from './infra/infra.module';

type RunServerOptions = {
  // Main nest module.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appModule: Type<any>;

  port?: number;
  // The base path of the swagger documentation.
  swaggerPath?: string;
  // OpenAPI definition.
  openApi?: Omit<OpenAPIObject, 'paths'>;
  // Hook up global interceptors to app
  interceptors?: NestInterceptor[];
}

export const createApp = async (options: RunServerOptions) => {
  const app = await NestFactory.create(InfraModule.forRoot(options.appModule));
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

function setupOpenApi(
  app: INestApplication,
  openApi: Omit<OpenAPIObject, 'paths'>,
  swaggerPath?: string,
) {
  const document = SwaggerModule.createDocument(app, openApi)
  SwaggerModule.setup(swaggerPath ?? 'swagger', app, document)
  return document;
}

function generateSchema(filePath: string, document: OpenAPIObject) {
  fs.writeFileSync(filePath, yaml.safeDump(document, { noRefs: true }));
}

export const bootstrap = async (options: RunServerOptions) => {
  const argv = yargs.option('generateSchema', {
    description: 'Generate OpenAPI schema into the specified file',
    type: 'string',
  }).argv;

  const app = await createApp(options);

  app.setGlobalPrefix('api');

  if (options.openApi) {
    const document = setupOpenApi(app, options.openApi, options.swaggerPath);

    if (argv.generateSchema) {
      generateSchema(argv.generateSchema, document);
      return;
    }
  }

  if (options.interceptors) {
    options.interceptors.forEach((interceptor) => {
      app.useGlobalInterceptors(interceptor);
    })
  }

  startServer(app, options.port);
}
