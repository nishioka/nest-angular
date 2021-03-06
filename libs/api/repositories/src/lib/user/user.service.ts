import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import {
  IncludeOptions,
  WhereOptions,
  OrderItem,
} from 'sequelize';
import * as ldapjs from 'ldapjs'
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');

import { User } from '@sample/api-models';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  FindUserDto,
} from '@sample/shared-dto';

const include: IncludeOptions[] = [
  {
    attributes: ['id', 'code', 'description'],
  },
];

const order: OrderItem[] = [['employeeNo', 'ASC']];

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    const results = await this.userRepository.findAll<User>({
      // include,
      order,
    });

    return results;
  }

  async getADUserList(): Promise<any> {
    return new Promise((resolve, reject) => {
// console.log('AuthService/getADDivisionList/this.options: ', this.options);
      const ldapConfig = this.configService.get('ldap');
      const ldap = ldapjs.createClient({
          url: ldapConfig.url,
          timeout: 4000,
          connectTimeout: 4000,
      });
      ldap.on('connectError', (err) => {
        console.log('AuthService/getADDivisionList/createClient/connectError: ', err);
        return reject();
      });
      ldap.on('error', (err) => {
        console.log('AuthService/getADDivisionList/createClient/error: ', err);
        return reject();
      });

      ldap.on('connect', () => {
// console.log('AuthService/getADDivisionList/connect: ');
        ldap.bind(ldapConfig.bindDN, ldapConfig.bindCredentials, (bindErr) => {
          if (bindErr) {
            console.log('AuthService/getADDivisionList/connect/bindErr: ', bindErr);
            if (bindErr.name === 'InvalidCredentialsError') {
                return reject();
            } else {
                return;
            }
          }
          ldap.search(ldapConfig.searchBase, {
            scope: 'sub',
            filter: '(&(objectCategory=person)(objectClass=user)(objectClass=organizationalPerson)(givenName=*)(sn=*))',
            // paged: false,
            // sizeLimit: 1
          }, (searchErr, searchResult) => {
// console.log('AuthService/getADDivisionList/search/searchResult: ');
            if (searchErr) {
                console.log('AuthService/getADDivisionList/search/searchErr: ', searchErr);
                return reject();
            }
            const users = [];
            searchResult.on('searchEntry', (entry) => {
              users.push({
                cn: entry.object.cn,
                dn: entry.object.dn,
                sn: entry.object.sn,
                givenName: entry.object.givenName,
                mail: entry.object.mail,
                name: entry.object.name,
                sAMAccountName: entry.object.sAMAccountName,
                userPrincipalName: entry.object.userPrincipalName,
              });
            });
            searchResult.on('end', () => {
              ldap.unbind();
              return resolve(users);
            });
          });
        });
      });
    });
  }

  async findOne(condition: FindUserDto): Promise<User> {
// console.log('UserService/findOne/condition:', condition);
    const where: WhereOptions = {};
    if (condition.id) where.id = condition.id;
    if (condition.employeeNo) where.employeeNo = condition.employeeNo;
    if (condition.name) where.name = condition.name;
    if (condition.email) where.email = condition.email;

    const result = await this.userRepository.findOne<User>({
      where,
      // include,
      order,
    });
    if (!result) {
      throw new HttpException(
        '????????????????????????????????????????????????',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async findById(id: string): Promise<User> {
    const result = await this.userRepository.findByPk<User>(id);
    if (!result) {
      throw new HttpException(
        '????????????id??????????????????????????????',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.userRepository.findOne<User>({
      where: { email },
    });
    if (!result) {
      throw new HttpException(
        '????????????email??????????????????????????????',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async findByEmployeeNo(employeeNo: string): Promise<User> {
// console.log('UserService/findByEmployeeNo/employeeNo:', employeeNo)
    const result = await this.userRepository.findOne<User>({
      where: { employeeNo },
    });
    if (!result) {
      throw new HttpException(
        '????????????employeeNo??????????????????????????????',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async findByName(name: string): Promise<User> {
    const result = await this.userRepository.findOne<User>({
      where: { name },
    });
    if (!result) {
      throw new HttpException(
        '????????????name??????????????????????????????',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.employeeNo = createUserDto.employeeNo;
    user.name = createUserDto.name;
    user.email =
      createUserDto.email && createUserDto.email.trim().toLowerCase();

    await user.save();

    const result = await this.findOne({ id: user.id });
// console.log('UserService/create/result: ', result);
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException(
        '??????????????????????????????????????????',
        HttpStatus.BAD_REQUEST
      );
    }

    user.employeeNo = updateUserDto.employeeNo || user.employeeNo;
    user.name = updateUserDto.name || user.name;
    user.email =
      (updateUserDto.email && updateUserDto.email.trim().toLowerCase()) ||
      user.email;

    await user.save();

    const result = await this.findOne({ id });

    return result;
  }

  async delete(id: string): Promise<UserDto> {
    const user = await this.userRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException(
        '??????????????????????????????????????????',
        HttpStatus.BAD_REQUEST
      );
    }

    await user.destroy();

    return new UserDto(user);
  }
}
