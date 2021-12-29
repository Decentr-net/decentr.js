import { Wallet } from '../../wallet';
import { ProfileUpdate } from '../pdv';

export type Profile = ProfileUpdate & {
  address: Wallet['address'];
  createdAt: string;
}

export interface ProfilePDVStatisticsItem {
  date: string;
  value: number;
}

export interface ProfileStatistics {
  postsCount: number;
  stats: ProfilePDVStatisticsItem[];
}
