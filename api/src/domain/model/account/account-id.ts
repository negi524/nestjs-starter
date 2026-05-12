import { Newtype } from '../newtype';

/**
 * アカウントID
 */
export type AccountId = Newtype<'AccountId', number>;

export function AccountId(value: number): AccountId {
  return value as AccountId;
}
