import { Injectable } from '@nestjs/common';

import {
  PopulateAnnouncementService,
} from '@sample/api-populate'
import { AnnouncementDto, CreateAnnouncementDto } from '@sample/shared-dto';

@Injectable()
export class TestDataAnnouncement {
  requests: CreateAnnouncementDto[];
  responses: AnnouncementDto[];

  createAnnouncementDtoErrorDescriptionRequired: any;

  constructor(
    private readonly populateAnnouncementService: PopulateAnnouncementService,
  ) { }

  async createTestData() {
    this.requests = this.populateAnnouncementService.createDatas.slice();
    this.responses = this.populateAnnouncementService.resultDatas.map((object) => <AnnouncementDto>object);
// console.log('TestDataUsers/createTestData/responses:', this.responses);

    this.createAnnouncementDtoErrorDescriptionRequired = {
      ...this.requests[0],
    };
    delete this.createAnnouncementDtoErrorDescriptionRequired.description;
  }

}
