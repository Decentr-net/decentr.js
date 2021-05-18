import { Wallet } from '../../wallet';
import { ProfilePDV } from '../pdv';

export interface AccountResponse {
  value: Account;
}

export type Profile = Omit<ProfilePDV, 'type'> & {
  address: Wallet['address'];
  createdAt: string;
}

export interface AccountCoin {
  readonly amount: string;
  readonly denom: string;
}

export interface AccountPublicKey {
  readonly type: string;
  readonly value: string;
}

export interface Account {
  readonly account_number: string;
  readonly address?: string;
  readonly coins: AccountCoin[];
  readonly public_key?: AccountPublicKey;
  readonly sequence: string;
}
