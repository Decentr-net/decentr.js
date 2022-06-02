import { GasPrice, SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { createSecp256k1WalletFromPrivateKey, Wallet } from '../../../wallet';
import { CosmosClient } from '../cosmos/client';
import {
  createErrorTransactionSignerFactory,
  createTransactionSignerFactory,
  TransactionSignerFactory,
} from '../transaction-signer';
import { REGISTRY } from '../registry';
import { CommunityClient } from './community';
import { OperationsClient } from './operations';
import { TokenClient } from './token';

export class DecentrClient extends CosmosClient {
  public readonly community = new CommunityClient(this.tmClient, this.transactionSignerFactory);
  public readonly operations = new OperationsClient(this.tmClient, this.transactionSignerFactory);
  public readonly token = new TokenClient(this.tmClient);

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
  ): Promise<DecentrClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    const tmClient = await Tendermint34Client.connect(nodeUrl);

    const transactionSignerFactory = privateKey
      ? await this.createTransactionSignerFactory(nodeUrl, tmClient, privateKey)
      : createErrorTransactionSignerFactory();

    return new DecentrClient(
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
    const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

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
