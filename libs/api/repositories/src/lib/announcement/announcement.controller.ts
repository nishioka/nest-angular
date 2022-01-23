import {
  Controller,
  Req,
  Body,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';

import {
  AnnouncementDto,
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from '@sample/shared-dto';

import { AnnouncementService } from './announcement.service';

@Controller('announcement')
@ApiTags('announcement')
@ApiBearerAuth()
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  @ApiOkResponse({ type: [AnnouncementDto] })
  async findAll(): Promise<AnnouncementDto[]> {
    const results = await this.announcementService.findAll();
    return results.map((object) => new AnnouncementDto(object));
  }

  @Get(':id')
  @ApiOkResponse({ type: AnnouncementDto })
  @ApiParam({ name: 'id', required: true })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<AnnouncementDto> {
    const result = await this.announcementService.findOne({ id });
    return new AnnouncementDto(result);
  }

  @Post()
  @ApiCreatedResponse({ type: AnnouncementDto })
  async create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @Req() request
  ): Promise<AnnouncementDto> {
    const result = await this.announcementService.create(
      createAnnouncementDto,
      request.user.id
    );
    return new AnnouncementDto(result);
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: AnnouncementDto })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    // @Req() request,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto
  ): Promise<AnnouncementDto> {
    const result = await this.announcementService.update(
      id,
      updateAnnouncementDto
    );
    return new AnnouncementDto(result);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AnnouncementDto })
  @ApiParam({ name: 'id', required: true })
  async delete(
    @Param('id', new ParseIntPipe()) id: number
    // @Req() request
  ): Promise<AnnouncementDto> {
    const result = await this.announcementService.delete(id);
    return new AnnouncementDto(result);
  }
}
