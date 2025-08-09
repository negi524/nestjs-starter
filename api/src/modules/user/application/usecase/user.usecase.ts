import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../domain/model/user';
import { UserName } from '../../domain/model/userName';
import { AccountRepository } from '../../domain/repository/account.repository';
import { AccountId } from '../../domain/model/account-id';
import { AccountProfile } from '../../domain/model/account-profile';
import { Account } from '../../domain/model/account';
import { Password } from '../../domain/model/password';

/**
 * ユーザー操作
 */
@Injectable()
export class UserUseCase {
  private readonly logger = new Logger(UserUseCase.name);
  constructor(private accountRepository: AccountRepository) {}

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
  async signinUser(
    username: UserName,
    password: string,
  ): Promise<AccountProfile | undefined> {
    const account = await this.accountRepository.fetchByName(username);
    if (account === undefined) {
      this.logger.error(
        `ユーザーが見つかりませんでした\tusername=${username.name}`,
      );
      // TODO: 例外を投げる
      return undefined;
    }

    // パスワード検証
    const passwordCorrect = await account.password.equals(password);
    if (!passwordCorrect) {
      this.logger.error(
        `パスワードが間違っています\tusername=${username.name}`,
      );
      // TODO: 例外を投げる
      return undefined;
    }
    return AccountProfile.from(account);
  }

  /**
   * 新規ユーザーを生成する
   * @param userName ユーザー名
   * @param plainPassword パスワード文字列
   * @returns 生成されたユーザー情報
   */
  async createUser(userName: string, plainPassword: string): Promise<Account> {
    const password = await Password.generate(plainPassword);
    return await this.accountRepository.save(userName, password);
  }
}
