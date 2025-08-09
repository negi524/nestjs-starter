import { AccountId } from '../model/account-id';
import { User } from '../model/user';

export abstract class AccountRepository {
  /**
   * アカウント情報を取得する
   * @param id アカウントID
   */
  abstract fetchAccount(id: AccountId): Promise<User | undefined>;
}
