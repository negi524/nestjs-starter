import { AccountId } from '../domain/model/account-id';
import { AccountRepository } from '../domain/repository/account.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Account } from '../domain/model/account';
import { Password } from '../domain/model/password';
import { AccountProfile } from '../domain/model/account-profile';
import { AccountName } from '../domain/model/account-name';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private prismaService: PrismaService) {}

  async fetchAccount(id: AccountId): Promise<AccountProfile | undefined> {
    const account = await this.prismaService.accountEntity.findUnique({
      where: { userId: id.value },
    });
    if (account === null) {
      return undefined;
    }
    return AccountProfile.fromEntity(account);
  }

  async fetchByName(name: AccountName): Promise<Account | undefined> {
    const account = await this.prismaService.accountEntity.findFirst({
      where: { userName: name.value },
    });
    if (account === null) {
      return undefined;
    }

    return Account.from(account);
  }

  async save(name: string, password: Password): Promise<Account> {
    const response = await this.prismaService.accountEntity.create({
      data: {
        userName: name,
        passwordHash: password.hash,
        salt: password.salt,
      },
    });
    return Account.from(response);
  }
}
