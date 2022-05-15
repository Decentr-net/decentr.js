import { StargateClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { CosmosClient } from '../cosmos/client';
import {
  createErrorTransactionSignerFactory,
  TransactionSignerFactory,
} from '../transaction-signer';
import { DepositClient } from './deposit';
import { NodeClient } from './node';
import { PlanClient } from './plan';
import { ProviderClient } from './provider';
import { SessionClient } from './session';
import { SubscriptionClient } from './subscription';

export class SentinelClient extends CosmosClient {
  public readonly deposit = new DepositClient(this.tmClient);
  public readonly node = new NodeClient(this.tmClient);
  public readonly plan = new PlanClient(this.tmClient);
  public readonly provider = new ProviderClient(this.tmClient);
  public readonly session = new SessionClient(this.tmClient);
  public readonly subscription = new SubscriptionClient(this.tmClient);

  constructor(
    stargateClient: StargateClient,
    tmClient: Tendermint34Client,
    transactionSignerFactory: TransactionSignerFactory,
  ) {
    super(stargateClient, tmClient, transactionSignerFactory);
  }

  public static async create(
    nodeUrl: string,
  ): Promise<SentinelClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    const tmClient = await Tendermint34Client.connect(nodeUrl);

    return new SentinelClient(
      stargateClient,
      tmClient,
      createErrorTransactionSignerFactory()
    );
  }
}
