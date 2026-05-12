import { AccountEntity } from '../../../../generated/prisma/client';
import { HashedPassword, restoreHashedPassword } from './password';
import { AccountName } from './account-name';

export class Account {
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
     * パスワード
     */
    public readonly password: HashedPassword,
    /**
     * 作成日時
     */
    public readonly createdAt: Date,
    /**
     * 更新日時
     */
    public readonly updatedAt: Date,
  ) {}

  public static from(accountEntity: AccountEntity) {
    return new Account(
      accountEntity.id,
      AccountName.from(accountEntity.name)._unsafeUnwrap(),
      restoreHashedPassword(accountEntity.passwordHash, accountEntity.salt),
      accountEntity.createdAt,
      accountEntity.updatedAt,
    );
  }
}
