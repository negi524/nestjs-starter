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
import { AccountUseCase } from '../application/usecase/account.usecase';
import { AccountResponseV1Dto } from './dto/response/account-response.v1.dto';
import { SigninAccountRequestV1Dto } from './dto/request/signin-account-request.v1.dto';
import { CreateAccountRequestV1Dto } from './dto/request/create-account-request.v1.dto';
import { AccountName } from '../domain/model/account-name';

@ApiTags('Account(DBから取得する)')
@Controller('v1/accounts')
export class AccountV1Controller {
  private readonly logger = new Logger(AccountUseCase.name);
  constructor(private readonly accountUseCase: AccountUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'アカウント情報を取得する' })
  @ApiOkResponse({ description: 'success', type: AccountResponseV1Dto })
  @ApiNotFoundResponse({
    description: 'NotFound',
    example: { statusCode: 404, message: 'NotFound' },
  })
  @Header('Cache-Control', 'public')
  async getAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AccountResponseV1Dto> {
    Logger.log('getAccount', { id: id });
    const account = await this.accountUseCase.getAccount(id);
    if (account === undefined) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return AccountResponseV1Dto.fromAccountProfile(account);
  }

  @Post('signin')
  @ApiOperation({ summary: 'アカウントのサインインを行う' })
  @HttpCode(200)
  @ApiOkResponse({ description: 'success', type: AccountResponseV1Dto })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    example: { statusCode: 403, message: 'Forbidden' },
  })
  async signin(
    @Body() signinAccountDto: SigninAccountRequestV1Dto,
  ): Promise<AccountResponseV1Dto> {
    Logger.log('signin', { signinAccountDto });
    const account = await this.accountUseCase.signinAccount(
      new AccountName(signinAccountDto.name),
      signinAccountDto.password,
    );
    if (account === undefined) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return AccountResponseV1Dto.fromAccountProfile(account);
  }

  @Post('create')
  @ApiOperation({ summary: 'アカウント情報を新規作成する' })
  @ApiCreatedResponse({ description: 'created', type: AccountResponseV1Dto })
  async createAccount(
    @Body() createAccountDto: CreateAccountRequestV1Dto,
  ): Promise<AccountResponseV1Dto> {
    this.logger.log('createAccount');
    const account = await this.accountUseCase.createUser(
      createAccountDto.name,
      createAccountDto.password,
    );

    return AccountResponseV1Dto.fromAccount(account);
  }
}
