import { Injectable, Logger } from '@nestjs/common';
import { AccountRepository } from '../../domain/repository/account.repository';
import { AccountId } from '../../domain/model/account-id';
import { AccountProfile } from '../../domain/model/account-profile';
import { Account } from '../../domain/model/account';
import { Password } from '../../domain/model/password';
import { AccountName } from '../../domain/model/account-name';

/**
 * ユーザー操作
 */
@Injectable()
export class AccountUseCase {
  private readonly logger = new Logger(AccountUseCase.name);
  constructor(private accountRepository: AccountRepository) {}

  /**
   * ユーザー情報を取得する
   * @param id ユーザーID
   * @returns ユーザー情報
   */
  async getAccount(id: number): Promise<AccountProfile | undefined> {
    this.logger.log('UseCase層でアカウント情報を取得します');
    const account = await this.accountRepository.fetchAccount(
      AccountId.from(id),
    );

    if (account === undefined) {
      this.logger.warn(`アカウントが見つかりませんでした\taccountId=${id}`);
      return undefined;
    }

    return account;
  }

  /**
   * ユーザーのサインインを行う
   * @param username ユーザー名
   * @param password パスワード
   * @returns ユーザー情報
   */
  async signinAccount(
    username: AccountName,
    password: string,
  ): Promise<AccountProfile | undefined> {
    const account = await this.accountRepository.fetchByName(username);
    if (account === undefined) {
      this.logger.error(
        `ユーザーが見つかりませんでした\tusername=${username.value}`,
      );
      // TODO: 例外を投げる
      return undefined;
    }

    // パスワード検証
    const passwordCorrect = account.password.verify(password);
    if (!passwordCorrect) {
      this.logger.error(
        `パスワードが間違っています\tusername=${username.value}`,
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
