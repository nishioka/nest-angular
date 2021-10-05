import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  Op,
  FindOptions,
  IncludeOptions,
  WhereOptions,
  OrderItem,
  Order,
} from 'sequelize';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');

import { Announcement, User } from '@sample/api-models';
import {
  FindAnnouncementDto,
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from '@sample/dto';

import { UserService } from '../user/user.service';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(Announcement)
    private readonly announcementRepository: typeof Announcement,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<Announcement[]> {
    const results = await this.announcementRepository.findAll<Announcement>({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['employeeNo', 'name'],
        },
      ],
    });

    return results;
  }

  async findOne(condition: FindAnnouncementDto): Promise<Announcement> {
    const where: WhereOptions = {};
    if (condition.id) where.id = condition.id;
    if (condition.content) where.content = condition.content;
    if (condition.authorId) where.authorId = condition.authorId;

    const result = await this.announcementRepository.findOne<Announcement>({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['employeeNo', 'name'],
        },
      ],
    });
    if (!result) {
      throw new HttpException(
        '条件に一致するお知らせが存在しません',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async findById(id: number): Promise<Announcement> {
    const result = await this.announcementRepository.findByPk(id);
    if (!result) {
      throw new HttpException(
        '一致するIDのお知らせが存在しません',
        HttpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    authorId?: string
  ): Promise<Announcement> {
    const announcement = new Announcement();
    announcement.content = createAnnouncementDto.content;
    announcement.date = dayjs(createAnnouncementDto.date).toDate();

    if (authorId) {
      announcement.authorId = authorId;
    } else if (createAnnouncementDto.authorId) {
      announcement.authorId = createAnnouncementDto.authorId;
    } else if (createAnnouncementDto.authorEmployeeNo) {
      const result = await this.userService.findByEmployeeNo(
        createAnnouncementDto.authorEmployeeNo
      );
      if (!result) {
        throw new HttpException(
          '関連する社員が存在しません',
          HttpStatus.BAD_REQUEST
        );
      }
      // console.log('AnnouncementService/create/user.id:', user.id);

      announcement.authorId = result.id;
    }

    await announcement.save();

    const result = await this.findOne({ id: announcement.id });

    return result;
  }

  async update(
    id: number,
    updateAnnouncementDto: UpdateAnnouncementDto
  ): Promise<Announcement> {
    const announcement =
      await this.announcementRepository.findByPk<Announcement>(id);
    if (!announcement) {
      throw new HttpException(
        '更新対象のお知らせが存在しません',
        HttpStatus.BAD_REQUEST
      );
    }

    // nullは許可しないのでundefinedの評価はしない
    announcement.content =
      updateAnnouncementDto.content || announcement.content;

    await announcement.save();

    const result = await this.findOne({ id });

    return result;
  }

  async delete(id: number): Promise<Announcement> {
    const announcement =
      await this.announcementRepository.findByPk<Announcement>(id);
    if (!announcement) {
      throw new HttpException(
        '削除対象のお知らせが存在しません',
        HttpStatus.BAD_REQUEST
      );
    }

    await announcement.destroy();

    return announcement;
  }
}
