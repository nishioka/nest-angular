import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '@sample/api-models';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
