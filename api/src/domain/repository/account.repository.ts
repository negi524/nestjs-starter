import { Account } from '../model/account/account';
import { AccountId } from '../model/account/account-id';
import { AccountName } from '../model/account/account-name';
import { AccountProfile } from '../model/account/account-profile';
import { Password } from '../model/account/password';

export abstract class AccountRepository {
  /**
   * アカウント情報を取得する
   * @param id アカウントID
   */
  abstract fetchAccount(id: AccountId): Promise<AccountProfile | undefined>;

  /**
   * アカウント情報を取得する
   * @param name アカウント名
   */
  abstract fetchByName(name: AccountName): Promise<Account | undefined>;

  /**
   * アカウントを保存する
   * @param name アカウント名
   * @param password パスワード
   */
  abstract save(name: string, password: Password): Promise<Account>;
}
