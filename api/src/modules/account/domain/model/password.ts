import * as bcryptjs from 'bcryptjs';
import { err, ok, Result } from 'neverthrow';

/**
 * パスワード生成エラー
 */
export type PasswordError =
  | { type: 'EMPTY_PASSWORD'; message: string }
  | { type: 'INVALID_PASSWORD'; message: string };

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
  public static generate(
    plainPassword: string,
  ): Result<Password, PasswordError> {
    if (!plainPassword || plainPassword.trim().length === 0) {
      return err({ type: 'EMPTY_PASSWORD', message: 'パスワードが必要です' });
    }

    // パスワード複雑さ要件チェック
    if (!this.isValidPassword(plainPassword)) {
      return err({
        type: 'INVALID_PASSWORD',
        message:
          'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
      });
    }
    const saltOrRounds = bcryptjs.genSaltSync(12);
    const hash = bcryptjs.hashSync(plainPassword, saltOrRounds);
    return ok(new Password(hash, saltOrRounds));
  }

  /**
   * パスワードの複雑さ要件をチェックします。
   * - 8文字以上
   * - 小文字英字、大文字英字、数字、特殊文字を含む
   * @param password チェックするパスワード
   * @returns 要件を満たす場合はtrue、そうでない場合はfalse
   */
  private static isValidPassword(password: string): boolean {
    // 8文字以上
    if (password.length < 8) return false;

    // 小文字英字チェック
    if (!/[a-z]/.test(password)) return false;

    // 大文字英字チェック
    if (!/[A-Z]/.test(password)) return false;

    // 数字チェック
    if (!/\d/.test(password)) return false;

    // 特殊文字チェック
    if (!this.hasSpecialCharacter(password)) return false;

    return true;
  }

  /**
   * パスワードに特殊文字が含まれているかをチェック
   * @param password パスワード文字列
   * @returns 特殊文字が含まれている場合はtrue、そうでない場合はfalse
   */
  private static hasSpecialCharacter(password: string): boolean {
    const specialChars = '!@#$%^&*()_+-=[]{};\':"\\|,.<>/?';
    return password.split('').some((char) => specialChars.includes(char));
  }
  /**
   * パスワードを比較する
   * @param plainPassword パスワード文字列
   * @returns 一致している場合はtrue
   */
  public verify(plainPassword: string): boolean {
    const hash = bcryptjs.hashSync(plainPassword, this.salt);
    return this.hash === hash;
  }
}
