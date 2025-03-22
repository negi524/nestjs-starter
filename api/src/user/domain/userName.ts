/**
 * ユーザー名
 */
export default class UserName {
  name: string;
  constructor(name: string) {
    if (name === '') {
      throw new Error('ユーザー名が不正です');
    }
    this.name = name;
  }
}
