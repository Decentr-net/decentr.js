import { Wallet } from '../../wallet';
import { ProfileUpdate } from '../pdv';
import { DenomAmount } from '../types';

export interface AccountResponse {
  value: Account;
}

export type AccountCoin = DenomAmount;

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

export type Profile = ProfileUpdate & {
  address: Wallet['address'];
  createdAt: string;
}
