import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { TokenBalance, TokenPool } from './types';

export class DecentrTokenClient {
  constructor(
    private nodeUrl: string,
  ) {
  }

  public getTokenBalance(walletAddress: Wallet['address']): Promise<TokenBalance> {
    const url = `${this.nodeUrl}/decentr/token/balance/${walletAddress}`;

    return fetchJson(url);
  }

  // TODO
  // public getTokenBalanceHistory(walletAddress: Wallet['address']): Promise<TokenBalanceHistory[]> {
  //   const url = `${this.nodeUrl}/token/balance/${walletAddress}/history`;
  //
  //   return fetchJson<TokenBalanceHistory[]>(url)
  //     .then((history) => history || []);
  // }

  public getTokenPool(): Promise<TokenPool> {
    const url = `${this.nodeUrl}/decentr/token/pool`;

    return fetchJson(url);
  }
}
