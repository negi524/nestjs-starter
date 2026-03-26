import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountV1Controller } from './presentation/controller/account.v1.controller';
import { AccountUseCase } from './application/usecase/account.usecase';
import { AccountRepository } from './domain/repository/account.repository';
import { AccountRepositoryImpl } from './infrastructure/repository/account.repositoryimpl';

@Module({
  imports: [PrismaModule],
  controllers: [AccountV1Controller],
  providers: [
    AccountUseCase,
    AccountV1Controller,
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
  ],
})
export class AccountModule {}
