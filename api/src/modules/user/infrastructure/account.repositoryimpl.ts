import { Account } from 'generated/prisma';
import { AccountId } from '../domain/model/account-id';
import { User } from '../domain/model/user';
import { AccountRepository } from '../domain/repository/account.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private prismaService: PrismaService) {}

  async fetchAccount(id: AccountId): Promise<User | undefined> {
    const account: Account | null = await this.prismaService.account.findUnique(
      {
        where: { userId: id.value },
      },
    );
    if (account === null) {
      return undefined;
    }
    return new User(account.userId, account.userName);
  }
}
