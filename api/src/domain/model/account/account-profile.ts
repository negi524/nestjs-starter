import { AccountEntity } from '../../../../generated/prisma/client';
import { Result } from 'neverthrow';
import { Account } from './account';
import { AccountName } from './account-name';
import { AccountNameError } from '../../exception/account-name-error';

/**
 * アカウントのプロファイル情報
 */
export interface AccountProfile {
  id: number;
  name: AccountName;
  createdAt: Date;
  updatedAt: Date;
}

export function accountProfileFrom(account: Account): AccountProfile {
  return {
    id: account.id,
    name: account.name,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}

export function accountProfileFromEntity(
  entity: AccountEntity,
): Result<AccountProfile, AccountNameError> {
  return AccountName.from(entity.name).map((name) => ({
    id: entity.id,
    name,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }));
}
