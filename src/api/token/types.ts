import { Coin } from '@cosmjs/stargate';

export interface TokenBalance {
  balance: string;
  balanceDelta?: string;
  isBanned?: boolean;
}

export interface TokenBalanceHistory {
  coins: Coin[];
  height: string;
}

export interface TokenPool {
  nextDistributionHeight: string;
  size?: Coin[];
  totalDelta: string;
}
