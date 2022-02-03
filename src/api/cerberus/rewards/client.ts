import { fetchJson } from '../../../utils';
import { Wallet } from '../../../wallet';
import { TokenDelta, TokenPool } from './types';

export class CerberusRewardsClient {
  constructor(
    private readonly url: string,
  ) {
  }

  public getDelta(walletAddress: Wallet['address']): Promise<TokenDelta> {
    const url = `${this.url}/v1/accounts/${walletAddress}/pdv-delta`;

    return fetchJson(url);
  }

  public getPool(): Promise<TokenPool> {
    const url = `${this.url}/v1/pdv-rewards/pool`;

    return fetchJson(url);
  }
}
