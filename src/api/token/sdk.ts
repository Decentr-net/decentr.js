import { getTokenBalance, getTokenBalanceHistory, getTokenPool } from './token';
import { TokenBalance, TokenBalanceHistory, TokenPool } from './types';
import { Wallet } from '../../wallet';

export class DecentrTokenSDK {
  constructor(
    private apiUrl: string,
  ) {
  }

  public getTokenBalance(walletAddress: Wallet['address']): Promise<TokenBalance> {
    return getTokenBalance(this.apiUrl, walletAddress);
  }

  public getTokenBalanceHistory(walletAddress: Wallet['address']): Promise<TokenBalanceHistory[]> {
    return getTokenBalanceHistory(this.apiUrl, walletAddress);
  }

  public getTokenPool(): Promise<TokenPool> {
    return getTokenPool(this.apiUrl);
  }
}
