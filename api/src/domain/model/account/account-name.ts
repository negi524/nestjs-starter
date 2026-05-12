import { Result, ok, err } from 'neverthrow';
import { AccountNameError } from '../../exception/account-name-error';

/**
 * アカウント名
 */
export class AccountName {
  constructor(public readonly value: string) {}

  public static from(name: string): Result<AccountName, AccountNameError> {
    if (!name || name.trim().length === 0) {
      return err(AccountNameError('ユーザー名が必要です'));
    }
    return ok(new AccountName(name));
  }
}
