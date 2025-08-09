import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserUseCase } from '../application/usecase/user.usecase';
import { UserResponseV1Dto } from './dto/response/user-response.v1.dto';
import { SigninUserV1Dto } from './dto/request/signin-user.v1.dto';
import User from '../domain/model/user';
import UserName from '../domain/model/userName';
import { CreateUserV1Dto } from './dto/request/create-user.v1.dto';

@Controller('users')
export class UserV1Controller {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'ユーザー情報を取得する' })
  @ApiOkResponse({ description: 'success', type: UserResponseV1Dto })
  @ApiNotFoundResponse({
    description: 'NotFound',
    example: { statusCode: 404, message: 'NotFound' },
  })
  @Header('Cache-Control', 'public')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseV1Dto> {
    Logger.log('getUser', { id: id });
    const user = await this.userUseCase.getUser(id);
    if (user === null) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return new UserResponseV1Dto(user);
  }

  @Post('signin')
  @ApiOperation({ summary: 'ユーザーのサインインを行う' })
  @HttpCode(200)
  @ApiOkResponse({ description: 'success', type: UserResponseV1Dto })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    example: { statusCode: 403, message: 'Forbidden' },
  })
  async signin(
    @Body() signinUserDto: SigninUserV1Dto,
  ): Promise<UserResponseV1Dto> {
    Logger.log('signin', { signinUserDto });
    const user: User | null = await this.userUseCase.signinUser(
      new UserName(signinUserDto.name),
      signinUserDto.password,
    );
    if (user === null) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return new UserResponseV1Dto(user);
  }

  @Post('create')
  @ApiOperation({ summary: 'ユーザー情報を新規作成する' })
  @ApiCreatedResponse({ description: 'created', type: UserResponseV1Dto })
  async createUser(
    @Body() createUserV1Dto: CreateUserV1Dto,
  ): Promise<UserResponseV1Dto> {
    Logger.log('createUser');
    const user = await this.userUseCase.createUser(
      createUserV1Dto.name,
      createUserV1Dto.password,
    );

    return new UserResponseV1Dto(user);
  }
}
