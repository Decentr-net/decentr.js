import { Wallet } from '../../wallet';
import { ProfileUpdate } from '../pdv';

export interface AccountPublicKey {
  '@type': string;
  key: string;
}

export interface Account {
  account_number: string;
  address?: string;
  public_key?: AccountPublicKey;
  sequence: string;
  '@type': string;
}

export type Profile = ProfileUpdate & {
  address: Wallet['address'];
  createdAt: string;
}
