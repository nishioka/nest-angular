import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');

import { AnnouncementService } from '@sample/api-repositories';
import { CreateAnnouncementDto } from '@sample/shared-dto';
import { announcementData } from '@sample/shared-test-data';

@Injectable()
export class PopulateAnnouncementService {
  createDatas: CreateAnnouncementDto[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resultDatas: any[];

  constructor(
    private readonly announcementsService: AnnouncementService,
  ) {
    this.createDatas = announcementData.createDatas;
    this.resultDatas = announcementData.resultDatas;
  }

  async populate() {
    for (const element of this.createDatas) {
      const result = await this.announcementsService.create(element);
      const resultData = this.resultDatas.find((object) => object.content === result.content);
      resultData.id = result.id;
      resultData.authorId = result.authorId;
      resultData.createdAt = dayjs(result.createdAt).toISOString();
// console.log('PopulateAnnouncementService/populate/content: ', result.content);
    }
  }

}
