import { Injectable, Logger } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../../domain/model/user';
import { UserName } from '../../domain/model/userName';
import { Account } from 'generated/prisma';
import { AccountRepository } from '../../domain/repository/account.repository';
import { AccountId } from '../../domain/model/account-id';

/**
 * ユーザー操作
 */
@Injectable()
export class UserUseCase {
  private readonly logger = new Logger(UserUseCase.name);
  constructor(
    private prismaService: PrismaService,
    private accountRepository: AccountRepository,
  ) {}

  /**
   * ユーザー情報を取得する
   * @param id ユーザーID
   * @returns ユーザー情報
   */
  async getUser(id: number): Promise<User | undefined> {
    const account = await this.accountRepository.fetchAccount(
      AccountId.from(id),
    );

    if (account === undefined) {
      this.logger.warn(`アカウントが見つかりませんでした\taccountId=${id}`);
      return undefined;
    }

    return new User(account.id, account.name);
  }

  /**
   * ユーザーのサインインを行う
   * @param username ユーザー名
   * @param password パスワード
   * @returns ユーザー情報
   */
  async signinUser(username: UserName, password: string): Promise<User | null> {
    const account: Account | null = await this.prismaService.account.findFirst({
      where: { userName: username.name },
    });
    if (account === null) {
      this.logger.error(
        `ユーザーが見つかりませんでした\tusername=${username.name}`,
      );
      return null;
    }

    const hash = await bcryptjs.hash(password, account.salt);

    // パスワード検証
    if (hash !== account.passwordHash) {
      this.logger.error(
        `パスワードが間違っています\tusername=${username.name}`,
      );
      return null;
    }
    return new User(account.userId, account.userName);
  }

  /**
   * 新規ユーザーを生成する
   * @param userName ユーザー名
   * @param password パスワード
   * @returns 生成されたユーザー情報
   */
  async createUser(userName: string, password: string): Promise<User> {
    const saltOrRounds = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, saltOrRounds);

    const response = await this.prismaService.account.create({
      data: {
        userName: userName,
        passwordHash: hash,
        salt: saltOrRounds,
      },
    });
    const user = new User(response.userId, response.userName);
    Logger.log({ user });
    return new Promise((resolve, reject) => {
      const success = true;
      if (success) {
        return resolve(user);
      } else {
        return reject(user);
      }
    });
  }
}
