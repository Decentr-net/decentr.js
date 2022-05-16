import { GasPrice, SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { createSecp256k1WalletFromPrivateKey, Wallet } from '../../../wallet';
import { CosmosClient } from '../cosmos/client';
import { OperationsClient } from '../decentr/operations';
import { REGISTRY } from '../registry';
import {
  createErrorTransactionSignerFactory,
  createTransactionSignerFactory,
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
  public readonly subscription = new SubscriptionClient(this.tmClient, this.transactionSignerFactory);

  constructor(
    stargateClient: StargateClient,
    tmClient: Tendermint34Client,
    transactionSignerFactory: TransactionSignerFactory,
  ) {
    super(stargateClient, tmClient, transactionSignerFactory);
  }

  public static async create(
    nodeUrl: string,
    privateKey?: Wallet['privateKey'],
  ): Promise<SentinelClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    const tmClient = await Tendermint34Client.connect(nodeUrl);

    const transactionSignerFactory = privateKey
      ? await this.createTransactionSignerFactory(nodeUrl, tmClient, privateKey)
      : createErrorTransactionSignerFactory();

    return new SentinelClient(
      stargateClient,
      tmClient,
      transactionSignerFactory,
    );
  }

  private static async getGasPrice(tmClient: Tendermint34Client): Promise<GasPrice> {
    const operationsClient = new OperationsClient(
      tmClient,
      createErrorTransactionSignerFactory(),
    );

    const minGasPrice = await operationsClient.getMinGasPrice();

    return GasPrice.fromString(minGasPrice.amount + minGasPrice.denom);
  }

  private static async createTransactionSignerFactory(
    nodeUrl: string,
    tmClient: Tendermint34Client,
    privateKey: Wallet['privateKey'],
  ): Promise<TransactionSignerFactory> {
    const wallet = await createSecp256k1WalletFromPrivateKey(privateKey, 'sent');

    tmClient = await Tendermint34Client.connect('https://terpsichore.mainnet.decentr.xyz');

    const gasPrice = await this.getGasPrice(tmClient);

    const signingStargateClient = await SigningStargateClient.connectWithSigner(
      nodeUrl,
      wallet,
      {
        gasPrice,
        registry: REGISTRY,
      },
    );

    const signerAddress = await wallet.getAccounts()
      .then((accounts) => accounts[0].address);

    return createTransactionSignerFactory(
      signingStargateClient,
      signerAddress,
      gasPrice,
    );
  }
}
