import { ApiProperty } from '../decorators-nest';

// import { User } from '@sample/api-models';

export class AssociateUserDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly employeeNo: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email?: string;

  constructor(user: any | void) {
    if (user) {
      this.id = user.id;
      this.employeeNo = user.employeeNo;
      this.name = user.name;
      this.email = user.email;
    }
  }
}
