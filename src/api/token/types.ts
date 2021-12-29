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
  size: string,
  total_delta: string;
  next_distribution_date: string;
}

export interface TokenDelta {
  delta: string;
  pool: TokenPool;
}
