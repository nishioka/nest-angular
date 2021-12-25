import { Injectable } from '@nestjs/common';

import { logger } from '@sample/api-logging';

import { PopulateAnnouncementService } from './announcement.populate.service';
import { PopulateUserService } from './user.populate.service';

@Injectable()
export class PopulateService {
  constructor(
    private readonly populateAnnouncementService: PopulateAnnouncementService,
    private readonly populateUserService: PopulateUserService,
  ) {}

  async init() {
    logger.info('Start populating!', { context: 'Bootstrap' });
    await this.populateUserService.populate();
    await this.populateAnnouncementService.populate();
  }
}
