import { AccountEntity } from 'generated/prisma';
import { Account } from './account';
import { AccountName } from './account-name';

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
    public readonly name: AccountName,
    /**
     * 作成日時
     */
    public readonly createdAt: Date,
    /**
     * 更新日時
     */
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

  public static fromEntity(accountEntity: AccountEntity): AccountProfile {
    return new AccountProfile(
      accountEntity.userId,
      AccountName.from(accountEntity.userName),
      accountEntity.createdAt,
      accountEntity.updatedAt,
    );
  }
}
