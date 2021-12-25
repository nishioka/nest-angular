import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja'
dayjs.locale('ja')

import { UserService } from '@sample/api-repositories';
import { CreateUserDto } from '@sample/dto';
import { userData } from '@sample/test-data';

@Injectable()
export class PopulateUserService {
  createDatas: CreateUserDto[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resultDatas: any[];

  constructor(
    private readonly userService: UserService,
  ) {
    this.createDatas = userData.createDatas;
    this.resultDatas = userData.resultDatas;
  }

  async populate() {
// console.log('PopulateUserService/populate/this.createDatas: ', this.createDatas);
    for (const element of this.createDatas) {
      const result = await this.userService.create(element);
      this.resultDatas.find((user) => user.employeeNo === result.employeeNo).id = result.id;
// console.log('PopulateUserService/populate/employeeNo: ', result.employeeNo);
    }
  }
}
