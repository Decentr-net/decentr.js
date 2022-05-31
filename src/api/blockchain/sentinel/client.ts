import { GasPrice, SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { fetchJson, FetchOptions } from '../../../utils';
import { createSecp256k1WalletFromPrivateKey, Wallet } from '../../../wallet';
import { CosmosClient } from '../cosmos/client';
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
import { SwapClient } from './swap';
import { SentinelNodeStatus } from './types';

export class SentinelClient extends CosmosClient {
  public readonly deposit = new DepositClient(this.tmClient);
  public readonly node = new NodeClient(this.tmClient);
  public readonly plan = new PlanClient(this.tmClient);
  public readonly provider = new ProviderClient(this.tmClient);
  public readonly session = new SessionClient(this.tmClient);
  public readonly subscription = new SubscriptionClient(this.tmClient, this.transactionSignerFactory);
  public readonly swap = new SwapClient(this.tmClient, this.transactionSignerFactory);

  constructor(
    stargateClient: StargateClient,
    tmClient: Tendermint34Client,
    transactionSignerFactory: TransactionSignerFactory,
  ) {
    super(stargateClient, tmClient, transactionSignerFactory);
  }

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
    signOptions?: {
      gasPrice: GasPrice,
      privateKey: Wallet['privateKey'],
    },
  ): Promise<SentinelClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    const tmClient = await Tendermint34Client.connect(nodeUrl);

    const transactionSignerFactory = signOptions
      ? await this.createTransactionSignerFactory(nodeUrl, signOptions.gasPrice, signOptions.privateKey)
      : createErrorTransactionSignerFactory();

    return new SentinelClient(
      stargateClient,
      tmClient,
      transactionSignerFactory,
    );
  }

  private static async createTransactionSignerFactory(
    nodeUrl: string,
    gasPrice: GasPrice,
    privateKey: Wallet['privateKey'],
  ): Promise<TransactionSignerFactory> {
    const wallet = await createSecp256k1WalletFromPrivateKey(privateKey, 'sent');

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
