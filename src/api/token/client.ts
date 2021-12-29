import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { fetchJson } from '../../utils';
import { Wallet } from '../../wallet';
import { setupTokenExtension, TokenExtension } from './extension';
import { AdvDdvStatistics, TokenDelta, TokenPool } from './types';

export class DecentrTokenClient {
  private constructor(
    private queryClient: QueryClient & TokenExtension,
    private tmClient: Tendermint34Client,
    private cerberusUrl: string,
    private theseusUrl: string,
  ) {
  }

  public static async create(
    nodeUrl: string,
    cerberusUrl: string,
    theseusUrl: string,
  ): Promise<DecentrTokenClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupTokenExtension,
    );

    return new DecentrTokenClient(queryClient, tendermintClient, cerberusUrl, theseusUrl);
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }

  public getBalance(walletAddress: Wallet['address']): Promise<string | undefined> {
    return this.queryClient.token.getBalance(walletAddress)
  }

  public getAdvDdvStats(): Promise<AdvDdvStatistics> {
    const url = `${this.theseusUrl}/v1/profiles/stats`;

    return fetchJson(url);
  }

  public getDelta(walletAddress: Wallet['address']): Promise<TokenDelta> {
    const url = `${this.cerberusUrl}/v1/accounts/${walletAddress}/pdv-delta`;

    return fetchJson(url);
  }

  public getPool(): Promise<TokenPool> {
    const url = `${this.cerberusUrl}/v1/pdv-rewards/pool`;

    return fetchJson(url);
  }

  // TODO
  // public getTokenBalanceHistory(walletAddress: Wallet['address']): Promise<TokenBalanceHistory[]> {
  //   const url = `${this.nodeUrl}/token/balance/${walletAddress}/history`;
  //
  //   return fetchJson<TokenBalanceHistory[]>(url)
  //     .then((history) => history || []);
  // }
}
