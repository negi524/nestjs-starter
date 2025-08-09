import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/modules/account/domain/model/account';
import { AccountProfile } from 'src/modules/account/domain/model/account-profile';

export class AccountResponseV1Dto {
  @ApiProperty({
    description: 'ユーザーID',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'ユーザー名',
    example: 'user1',
  })
  name: string;

  private constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public static fromAccountProfile(
    account: AccountProfile,
  ): AccountResponseV1Dto {
    return new AccountResponseV1Dto(account.id, account.name.value);
  }

  public static fromAccount(account: Account): AccountResponseV1Dto {
    return new AccountResponseV1Dto(account.id, account.name.value);
  }
}
