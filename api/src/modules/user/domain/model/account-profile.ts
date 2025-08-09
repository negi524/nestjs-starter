import { Account } from './account';

/**
 * アカウントのプロファイル情報
 */
export class AccountProfile {
  private constructor(
    /**
     * アカウントID
     */
    public readonly id: number,
    /**
     * アカウント名
     */
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static from(account: Account): AccountProfile {
    return new AccountProfile(
      account.id,
      account.name,
      account.createdAt,
      account.updatedAt,
    );
  }
}
