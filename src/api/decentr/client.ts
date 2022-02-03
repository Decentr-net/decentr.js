import { GasPrice, SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { StatusResponse, Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { createSecp256k1WalletFromPrivateKey, Wallet } from '../../wallet';
import { DecentrAuthClient } from './auth';
import { DecentrBankClient } from './bank';
import { DecentrBlocksClient } from './blocks';
import { DecentrCommunityClient } from './community';
import { DecentrDistributionClient } from './distribution';
import { DecentrMintClient } from './mint';
import { DecentrOperationsClient } from './operations';
import { DecentrStakingClient } from './staking';
import { DecentrTokenClient } from './token';
import { DecentrTxClient } from './tx';
import { REGISTRY } from './registry';
import {
  createErrorTransactionSignerFactory,
  createTransactionSignerFactory,
  TransactionSignerFactory,
} from './transaction-signer';

export class DecentrClient {
  public readonly auth = new DecentrAuthClient(this.stargateClient);
  public readonly bank = new DecentrBankClient(this.tmClient, this.transactionSignerFactory);
  public readonly blocks = new DecentrBlocksClient(this.stargateClient);
  public readonly community = new DecentrCommunityClient(this.tmClient, this.transactionSignerFactory);
  public readonly distribution = new DecentrDistributionClient(this.tmClient, this.transactionSignerFactory);
  public readonly mint = new DecentrMintClient(this.tmClient);
  public readonly operations = new DecentrOperationsClient(this.tmClient, this.transactionSignerFactory);
  public readonly staking = new DecentrStakingClient(this.stargateClient, this.tmClient, this.transactionSignerFactory);
  public readonly token = new DecentrTokenClient(this.tmClient);
  public readonly tx = new DecentrTxClient(this.stargateClient);

  constructor(
    private readonly stargateClient: StargateClient,
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
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

  public status(): Promise<StatusResponse> {
    return this.tmClient.status();
  }

  public disconnect(): void {
    this.stargateClient.disconnect();
    this.tmClient.disconnect();
  }

  private static async createTransactionSignerFactory(
    nodeUrl: string,
    tmClient: Tendermint34Client,
    privateKey: Wallet['privateKey'],
  ): Promise<TransactionSignerFactory> {
    const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

    const operationsClient = new DecentrOperationsClient(
      tmClient,
      createErrorTransactionSignerFactory(),
    );

    const minGasPrice = await operationsClient.getMinGasPrice();

    const gasPrice = GasPrice.fromString(minGasPrice.amount + minGasPrice.denom);

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
