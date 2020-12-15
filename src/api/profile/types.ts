import { StdTxResponse } from '../types';
import { BroadcastOptions } from '../messages'
import { Wallet } from '../../wallet';

export type QueryPrivateProfileResponse = StdTxResponse<'profile/SetPrivate', { private: string }>;

export type QueryPublicProfileResponse = StdTxResponse<'profile/SetPublic', { public: PublicProfile }>;

export interface AccountResponse {
  value: Account;
}

interface BaseProfileBroadcastOptions extends BroadcastOptions {
  broadcast: true,
}

export interface PublicProfileBroadcastOptions extends BaseProfileBroadcastOptions {
  privateKey: Wallet['privateKey'],
}

export type PrivateProfileBroadcastOptions = BaseProfileBroadcastOptions;

export interface TokenBalanceResponse {
  readonly balance: number;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface PublicProfile {
  readonly avatar: string;
  readonly birthday: string;
  readonly firstName: string;
  readonly gender: Gender;
  readonly lastName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PrivateProfile {
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
