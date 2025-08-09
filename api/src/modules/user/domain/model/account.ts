import { AccountEntity } from 'generated/prisma';
import { Password } from './password';

export class Account {
  private constructor(
    /**
     * アカウントID
     */
    public readonly id: number,
    /**
     * アカウント名
     */
    public readonly name: string,
    /**
     * パスワード
     */
    public readonly password: Password,
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
      accountEntity.userId,
      accountEntity.userName,
      Password.from(accountEntity.passwordHash, accountEntity.salt),
      accountEntity.createdAt,
      accountEntity.updatedAt,
    );
  }
}
