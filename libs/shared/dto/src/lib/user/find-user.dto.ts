import { ApiProperty } from '../decorators-nest';

export class FindUserDto {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty()
  readonly employeeNo?: string;

  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly email?: string;
}
