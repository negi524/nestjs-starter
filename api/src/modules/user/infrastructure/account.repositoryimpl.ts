import { AccountId } from '../domain/model/account-id';
import { User } from '../domain/model/user';
import { AccountRepository } from '../domain/repository/account.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserName } from '../domain/model/userName';
import { Account } from '../domain/model/account';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private prismaService: PrismaService) {}
  async fetchAccount(id: AccountId): Promise<User | undefined> {
    const account = await this.prismaService.accountEntity.findUnique({
      where: { userId: id.value },
    });
    if (account === null) {
      return undefined;
    }
    return new User(account.userId, account.userName);
  }

  async fetchByName(name: UserName): Promise<Account | undefined> {
    const account = await this.prismaService.accountEntity.findFirst({
      where: { userName: name.name },
    });
    if (account === null) {
      return undefined;
    }

    return Account.from(account);
  }
}
