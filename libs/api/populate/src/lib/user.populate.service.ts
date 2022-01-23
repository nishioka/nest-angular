import { Injectable } from '@nestjs/common';
import * as child_process from 'child_process';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja'
dayjs.locale('ja')

import { UserService } from '@sample/api-repositories';
import { CreateUserDto } from '@sample/shared-dto';
import { userData } from '@sample/shared-test-data';

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
    // Delete existing user data on ldap
    const ldapUsers = await this.userService.getADUserList();
// console.log('PopulateUserService/populate/ldapUsers: ', ldapUsers);
    for (const ldapUser of ldapUsers) {
      child_process.execSync(`docker exec $(docker ps -aqf "name=samba") samba-tool user delete "${ldapUser.sAMAccountName}"`);
    }

// console.log('PopulateUserService/populate/this.createDatas: ', this.createDatas);
    for (const element of this.createDatas) {
      const user = JSON.parse(JSON.stringify(element));
      if (element.employeeNo !== 'admin') {
        const [surname, givenName] = element.name.split(' ')
        child_process.execSync(`docker exec $(docker ps -aqf "name=samba") samba-tool user add "${element.employeeNo}" "${element.password}"`);
        child_process.execSync(`docker exec $(docker ps -aqf "name=samba") samba-tool user rename "${element.employeeNo}" ` +
          `--force-new-cn="${element.name}" ` + `--mail-address="${element.email}" ` +
          `--surname="${surname}" ` + `--given-name="${givenName}"`);
        // passwordはDB登録に登録しないが、createDatasから消してしまうとテストに使えなくなってしまうのでコピーを使用する
        delete user.password;
      }
      const result = await this.userService.create(user);
      this.resultDatas.find((user) => user.employeeNo === result.employeeNo).id = result.id;
// console.log('PopulateUserService/populate/employeeNo: ', result.employeeNo);
    }
  }
}
