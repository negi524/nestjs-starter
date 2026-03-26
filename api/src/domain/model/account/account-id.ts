/**
 * アカウントID
 */
export class AccountId {
  private constructor(public readonly value: number) {}

  public static from(id: number) {
    return new AccountId(id);
  }
}
