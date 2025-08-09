import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserV1Controller } from './presentation/user.v1.controller';
import { UserUseCase } from './application/usecase/user.usecase';
import { AccountRepository } from './domain/repository/account.repository';
import { AccountRepositoryImpl } from './infrastructure/account.repositoryimpl';

@Module({
  imports: [PrismaModule],
  controllers: [UserV1Controller],
  providers: [
    UserUseCase,
    UserV1Controller,
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
  ],
})
export class UserModule {}
