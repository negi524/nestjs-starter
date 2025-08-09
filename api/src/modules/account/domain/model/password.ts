import * as bcryptjs from 'bcryptjs';

/**
 * パスワード
 */
export class Password {
  constructor(
    public readonly hash: string,
    public readonly salt: string,
  ) {}

  /**
   * パスワードオブジェクトを生成する
   * @param passwordHash パスワードのハッシュ値
   * @param salt パスワードのsalt値
   * @returns 生成されたパスワードオブジェクト
   */
  public static from(passwordHash: string, salt: string): Password {
    return new Password(passwordHash, salt);
  }

  /**
   * パスワードオブジェクトを生成する
   * @param plainPassword パスワード文字列
   * @returns 生成されたパスワードオブジェクト
   */
  public static async generate(plainPassword: string): Promise<Password> {
    const saltOrRounds = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(plainPassword, saltOrRounds);
    return new Password(hash, saltOrRounds);
  }

  /**
   * パスワードを比較する
   * @param plainPassword パスワード文字列
   * @returns 一致している場合はtrue
   */
  public async equals(plainPassword: string): Promise<boolean> {
    const hash = await bcryptjs.hash(plainPassword, this.salt);
    return this.hash === hash;
  }
}
