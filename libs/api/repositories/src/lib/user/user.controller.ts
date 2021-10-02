import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  // Post,
  Body,
  // HttpCode,
  Delete,
  Req,
  Param,
  Put,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';

import { UserDto, UpdateUserDto } from '@sample/dto';

import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'List', description: 'Get user list.' })
  @Get()
  @ApiOkResponse({ type: [UserDto] })
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @ApiOperation({ summary: 'Profile', description: 'Get my profile.' })
  @Get('me')
  @ApiOkResponse({ type: UserDto })
  async getMe(@Req() request): Promise<UserDto> {
    const user = await this.userService.findOne({ id: request.user.id });
    return new UserDto(user);
  }

  @ApiOperation({
    summary: 'Infomation',
    description: 'Get user infomation by employeeNo.',
  })
  @Get(':employeeNo')
  @ApiParam({ name: 'employeeNo', required: true })
  @ApiOkResponse({ type: UserDto })
  async findOne(
    @Param('employeeNo') employeeNo: string
    // @Req() request
  ): Promise<UserDto> {
    const user = await this.userService.findOne({ employeeNo });
    return new UserDto(user);
  }

  @ApiOperation({ summary: 'Profile', description: 'Update my profile.' })
  @Put('me')
  @ApiOkResponse({ type: UserDto })
  async updateMe(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request
  ): Promise<UserDto> {
    const user = await this.userService.update(request.user.id, updateUserDto);
    return new UserDto(user);
  }

  @ApiOperation({
    summary: 'Infomation',
    description: 'Update user infomation.',
  })
  @Put(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: UserDto })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
    // @Req() request
  ): Promise<UserDto> {
    // console.log('UsersController/update/id: ', id);
    const user = await this.userService.update(id, updateUserDto);
    // console.log('UsersController/update/user: ', user);
    return new UserDto(user);
  }

  @ApiOperation({ summary: 'Delete', description: 'Delete user.' })
  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: UserDto })
  delete(
    @Param('id', new ParseUUIDPipe()) id: string
    // @Req() request
  ): Promise<UserDto> {
    return this.userService.delete(id);
  }
}
