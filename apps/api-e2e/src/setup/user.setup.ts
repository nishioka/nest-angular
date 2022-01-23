import { Injectable } from '@nestjs/common';

import {
  PopulateUserService,
} from '@sample/api-populate'
import { UserDto, CreateUserDto } from '@sample/shared-dto';

@Injectable()
export class TestDataUser {
  requests: CreateUserDto[];
  responses: UserDto[];

  constructor(
    private readonly populateUserService: PopulateUserService,
  ) { }

  async createTestData() {
    this.requests = JSON.parse(JSON.stringify(this.populateUserService.createDatas));
    this.requests.sort((a, b) => a.employeeNo > b.employeeNo ? 1 : -1);
    this.responses = this.populateUserService.resultDatas.map((user) => <UserDto>user);
  }

}
