import { Wallet } from '../../wallet';
import { StdTxMessageType, StdTxResponse } from '../types';
import { BroadcastOptions } from '../messages';
import { Gender, ProfilePDV } from '../pdv';

export type QueryPrivateProfileResponse = StdTxResponse<StdTxMessageType.ProfileSetPrivate>;

export type QueryPublicProfileResponse = StdTxResponse<StdTxMessageType.ProfileSetPublic>;

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

export interface PublicProfile {
  avatar: string;
  bio: string;
  birthday: string;
  firstName: string;
  gender: Gender;
  lastName: string;
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

export type Profile = Omit<ProfilePDV, 'type'> & {
  address: Wallet['address'];
  createdAt: string;
}
