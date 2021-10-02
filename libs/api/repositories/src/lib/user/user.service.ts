import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  Op,
  FindOptions,
  IncludeOptions,
  WhereOptions,
  OrderItem,
  Order,
} from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');

import { User } from '@sample/api-models';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  FindUserDto,
} from '@sample/dto';

const include: IncludeOptions[] = [
  {
    attributes: ['id', 'code', 'description'],
  },
  {
    model: User,
    as: 'authorizations',
    attributes: ['id', 'employeeNo', 'name', 'email'],
    through: {
      attributes: [],
    },
  },
];

const order: OrderItem[] = [['authorizations', 'employeeNo', 'ASC']];

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User
  ) {}

  async findAll(): Promise<User[]> {
    const results = await this.userRepository.findAll<User>({
      include,
      order,
    });

    return results;
  }

  async findOne(condition: FindUserDto): Promise<User> {
    // console.log('UserService/findOne/condition:', condition);
    const query: any = {};
    if (condition.id) query.id = condition.id;
    if (condition.employeeNo) query.employeeNo = condition.employeeNo;
    if (condition.name) query.name = condition.name;
    if (condition.email) query.email = condition.email;

    const result = await this.userRepository.findOne<User>({
      where: query,
      include,
      order,
    });
    if (!result) {
      throw new HttpException(
        '条件に一致する社員が存在しません',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async findById(id: string): Promise<User> {
    const result = await this.userRepository.findByPk<User>(id);
    if (!result) {
      throw new HttpException(
        '条件に一致する社員が存在しません',
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
        '条件に一致する社員が存在しません',
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
        '条件に一致する社員が存在しません',
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
        '条件に一致する社員が存在しません',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async findToken(token: string) {
    // console.log('UserService/findToken/token:', token);
    const result = await this.userRepository.findOne<User>({
      where: {
        [Op.and]: [
          {
            resetPasswordToken: token,
          },
          {
            resetPasswordExpires: {
              [Op.gt]: Date.now(),
            },
          },
        ],
      },
    });
    // console.log('UserService/findToken/user:', user);
    if (!result) {
      throw new HttpException(
        '条件に一致する社員が存在しません',
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

    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException(
        '更新対象の社員が存在しません',
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
        '削除対象の社員が存在しません',
        HttpStatus.BAD_REQUEST
      );
    }

    await user.destroy();

    return new UserDto(user);
  }
}