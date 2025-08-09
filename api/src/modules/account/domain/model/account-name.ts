/**
 * アカウント名
 */
export class AccountName {
  constructor(public readonly value: string) {}

  public static from(name: string): AccountName {
    if (name === '') {
      throw new Error('ユーザー名が不正です');
    }
    return new AccountName(name);
  }
}
