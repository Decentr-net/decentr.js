import { DenomAmount } from '../types';

export interface TokenBalance {
  balance: string;
  balanceDelta?: string;
  isBanned?: boolean;
}

export interface TokenBalanceHistory {
  coins: DenomAmount[];
  height: string;
}

export interface TokenPool {
  nextDistributionHeight: string;
  size?: DenomAmount[];
  totalDelta: string;
}
