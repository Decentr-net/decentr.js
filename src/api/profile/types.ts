import { StdTxResponse } from '../types';

export type QueryPrivateProfileResponse = StdTxResponse<'profile/SetPrivate', { private: string }>;

export type QueryPublicProfileResponse = StdTxResponse<'profile/SetPublic', { public: PublicProfile }>;

export interface TokenBalanceResponse {
  readonly balance: number;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface PublicProfile {
  readonly birthday: string;
  readonly gender: Gender;
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
