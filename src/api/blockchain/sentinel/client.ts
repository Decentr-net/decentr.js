import { fetchJson, FetchOptions } from '../../../utils';
import { CosmosClient, CosmosClientSigningOptions } from '../cosmos/client';
import { DepositClient } from './deposit';
import { NodeClient } from './node';
import { PlanClient } from './plan';
import { ProviderClient } from './provider';
import { SessionClient } from './session';
import { SubscriptionClient } from './subscription';
import { SwapClient } from './swap';
import { SentinelNodeStatus } from './types';

export class SentinelClient extends CosmosClient {
  public readonly deposit = new DepositClient(this.tmClient);
  public readonly node = new NodeClient(this.tmClient);
  public readonly plan = new PlanClient(this.tmClient);
  public readonly provider = new ProviderClient(this.tmClient);
  public readonly session = new SessionClient(this.tmClient, this.transactionSignerFactory);
  public readonly subscription = new SubscriptionClient(this.tmClient, this.transactionSignerFactory);
  public readonly swap = new SwapClient(this.tmClient, this.transactionSignerFactory);

  public static getNodeStatus(
    url: string,
    options: Pick<FetchOptions, 'timeout'> = {},
  ): Promise<SentinelNodeStatus> {
    const endpoint = url + '/status';

    return fetchJson<{ result: SentinelNodeStatus }>(endpoint, options)
      .then((response) => response.result);
  }

  public static async create(
    nodeUrl: string,
    options?: Omit<CosmosClientSigningOptions, 'walletPrefix'>,
  ): Promise<SentinelClient> {
    return this.createExtendedClient(
      SentinelClient,
      nodeUrl,
      options && { ...options, walletPrefix: 'sent' },
    );
  }
}
