import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { setupTokenExtension, TokenExtension } from './extension';

export class DecentrTokenClient {
  private constructor(
    private queryClient: QueryClient & TokenExtension,
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrTokenClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupTokenExtension,
    );

    return new DecentrTokenClient(queryClient, tendermintClient);
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }

  public getTokenBalance(walletAddress: Wallet['address']): Promise<string | undefined> {
    return this.queryClient.token.getBalance(walletAddress)
  }

  // TODO
  // public getTokenBalanceHistory(walletAddress: Wallet['address']): Promise<TokenBalanceHistory[]> {
  //   const url = `${this.nodeUrl}/token/balance/${walletAddress}/history`;
  //
  //   return fetchJson<TokenBalanceHistory[]>(url)
  //     .then((history) => history || []);
  // }

  // public getTokenPool(): Promise<TokenPool> {
  //   const url = `${this.nodeUrl}/decentr/token/pool`;
  //
  //   return fetchJson(url);
  // }
}
