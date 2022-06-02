import { StargateClient } from '@cosmjs/stargate';
import { StatusResponse, Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { AuthClient } from './auth';
import { BankClient } from './bank';
import { BlocksClient } from './blocks';
import { DistributionClient } from './distribution';
import { MintClient } from './mint';
import { StakingClient } from './staking';
import { TxClient } from './tx';
import { TransactionSignerFactory } from '../transaction-signer';

export class CosmosClient {
  public readonly auth = new AuthClient(this.stargateClient);
  public readonly bank = new BankClient(this.tmClient, this.transactionSignerFactory);
  public readonly blocks = new BlocksClient(this.stargateClient);
  public readonly distribution = new DistributionClient(this.tmClient, this.transactionSignerFactory);
  public readonly mint = new MintClient(this.tmClient);
  public readonly staking = new StakingClient(this.stargateClient, this.tmClient, this.transactionSignerFactory);
  public readonly tx = new TxClient(this.stargateClient);

  constructor(
    protected readonly stargateClient: StargateClient,
    protected readonly tmClient: Tendermint34Client,
    protected readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public status(): Promise<StatusResponse> {
    return this.tmClient.status();
  }

  public disconnect(): void {
    this.stargateClient.disconnect();
    this.tmClient.disconnect();
  }
}
