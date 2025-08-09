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
  ApiTags,
} from '@nestjs/swagger';
import { UserUseCase } from '../application/usecase/user.usecase';
import { UserResponseV1Dto } from './dto/response/user-response.v1.dto';
import { SigninUserV1Dto } from './dto/request/signin-user.v1.dto';
import { CreateUserV1Dto } from './dto/request/create-user.v1.dto';
import { AccountName } from '../domain/model/account-name';

@ApiTags('User')
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
    const account = await this.userUseCase.getUser(id);
    if (account === undefined) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return UserResponseV1Dto.fromAccountProfile(account);
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
    const account = await this.userUseCase.signinUser(
      new AccountName(signinUserDto.name),
      signinUserDto.password,
    );
    if (account === undefined) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return UserResponseV1Dto.fromAccountProfile(account);
  }

  @Post('create')
  @ApiOperation({ summary: 'ユーザー情報を新規作成する' })
  @ApiCreatedResponse({ description: 'created', type: UserResponseV1Dto })
  async createUser(
    @Body() createUserV1Dto: CreateUserV1Dto,
  ): Promise<UserResponseV1Dto> {
    Logger.log('createUser');
    const account = await this.userUseCase.createUser(
      createUserV1Dto.name,
      createUserV1Dto.password,
    );

    return UserResponseV1Dto.fromAccount(account);
  }
}
