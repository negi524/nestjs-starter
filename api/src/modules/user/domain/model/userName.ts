/**
 * ユーザー名
 */
export class UserName {
  public readonly name: string;
  constructor(name: string) {
    if (name === '') {
      throw new Error('ユーザー名が不正です');
    }
    this.name = name;
  }
}
