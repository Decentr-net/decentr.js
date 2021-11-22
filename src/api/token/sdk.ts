import { Wallet } from '../../wallet';
import { getTokenBalance, getTokenPool } from './api';
import { TokenBalance, TokenPool } from './types';

export class DecentrTokenSDK {
  constructor(
    private nodeUrl: string,
  ) {
  }

  public getTokenBalance(walletAddress: Wallet['address']): Promise<TokenBalance> {
    return getTokenBalance(this.nodeUrl, walletAddress);
  }

  // TODO
  // public getTokenBalanceHistory(walletAddress: Wallet['address']): Promise<TokenBalanceHistory[]> {
  //   return getTokenBalanceHistory(this.nodeUrl, walletAddress);
  // }

  public getTokenPool(): Promise<TokenPool> {
    return getTokenPool(this.nodeUrl);
  }
}
