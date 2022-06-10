import { GasPrice } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../../wallet';
import { CosmosClient } from '../cosmos/client';
import { createErrorTransactionSignerFactory } from '../transaction-signer';
import { CommunityClient } from './community';
import { OperationsClient } from './operations';
import { TokenClient } from './token';

export class DecentrClient extends CosmosClient {
  public readonly community = new CommunityClient(this.tmClient, this.transactionSignerFactory);
  public readonly operations = new OperationsClient(this.tmClient, this.transactionSignerFactory);
  public readonly token = new TokenClient(this.tmClient);

  public static async create(
    nodeUrl: string,
    privateKey?: Wallet['privateKey'],
  ): Promise<DecentrClient> {

    const options = privateKey
      ? {
        gasPrice: await this.getGasPrice(nodeUrl),
        privateKey,
      }
      : undefined;

    return CosmosClient.createExtendedClient(DecentrClient, nodeUrl, options);
  }

  private static async getGasPrice(
    nodeUrl: string,
  ): Promise<GasPrice> {
    const tmClient = await Tendermint34Client.connect(nodeUrl);

    const operationsClient = new OperationsClient(
      tmClient,
      createErrorTransactionSignerFactory(),
    );

    const minGasPrice = await operationsClient.getMinGasPrice();

    return GasPrice.fromString(minGasPrice.amount + minGasPrice.denom);
  }
}
