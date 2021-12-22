import { Wallet } from '../../wallet';
import { ProfileUpdate } from '../pdv';

export type Profile = ProfileUpdate & {
  address: Wallet['address'];
  createdAt: string;
}
