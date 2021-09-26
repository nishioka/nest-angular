import { Module, DynamicModule, Type } from '@nestjs/common';
import { LoggingModule } from '@sample/api-logging';

import { InfraController } from './infra.controller';

@Module({
  controllers: [InfraController],
  imports: [LoggingModule],
})
export class InfraModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static forRoot(AppModule: Type<any>): DynamicModule {
    return {
      module: InfraModule,
      imports: [AppModule],
    };
  }
}
