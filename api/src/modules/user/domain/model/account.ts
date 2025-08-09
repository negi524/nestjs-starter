import * as bcryptjs from 'bcryptjs';
import { AccountEntity } from 'generated/prisma';

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
     * パスワードハッシュ
     */
    public readonly passwordHash: string,
    /**
     * ソルト
     */
    public readonly salt: string,
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
      accountEntity.passwordHash,
      accountEntity.salt,
      accountEntity.createdAt,
      accountEntity.updatedAt,
    );
  }

  /**
   * パスワードの一致を比較する
   * @param plainPassword 比較対象のパスワード文字列
   * @returns 一致している場合true
   */
  public async equalPassword(plainPassword: string): Promise<boolean> {
    const hash = await bcryptjs.hash(plainPassword, this.salt);
    return this.passwordHash === hash;
  }
}
