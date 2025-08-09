import { Account } from '../model/account';
import { AccountId } from '../model/account-id';
import { User } from '../model/user';
import { UserName } from '../model/userName';

export abstract class AccountRepository {
  /**
   * アカウント情報を取得する
   * @param id アカウントID
   */
  abstract fetchAccount(id: AccountId): Promise<User | undefined>;

  /**
   * アカウント情報を取得する
   * @param name アカウント名
   */
  abstract fetchByName(name: UserName): Promise<Account | undefined>;
}
