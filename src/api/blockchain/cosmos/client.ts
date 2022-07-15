import {
  GasPrice,
  SigningStargateClient,
  SigningStargateClientOptions,
  StargateClient,
} from '@cosmjs/stargate';
import { StatusResponse, Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { createSecp256k1WalletFromPrivateKey, Wallet } from '../../../wallet';
import { REGISTRY } from '../registry';
import {
  createErrorTransactionSignerFactory,
  createTransactionSignerFactory,
  TransactionSignerFactory,
} from '../transaction-signer';
import { AuthClient } from './auth';
import { BankClient } from './bank';
import { BlocksClient } from './blocks';
import { DistributionClient } from './distribution';
import { MintClient } from './mint';
import { StakingClient } from './staking';
import { TxClient } from './tx';

export interface CosmosClientSigningOptions extends Pick<SigningStargateClientOptions, 'broadcastTimeoutMs' | 'broadcastPollIntervalMs'> {
  gasPrice: GasPrice;
  privateKey: Wallet['privateKey'];
  walletPrefix?: string;
}

type ExtendedClient<T> = {
  new (
    stargateClient: StargateClient,
    tmClient: Tendermint34Client,
    transactionSignerFactory: TransactionSignerFactory,
  ): T;
};

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

  protected static async createExtendedClient<T extends CosmosClient>(
    extendedConstructor: ExtendedClient<T>,
    nodeUrl: string,
    options?: CosmosClientSigningOptions,
  ): Promise<T> {
    const hasRequiredSigningOptions = options?.privateKey && options.gasPrice;

    const tmClient = await Tendermint34Client.connect(nodeUrl);

    const stargateClient = hasRequiredSigningOptions
      ? await this.createSigningStargateClient(nodeUrl, options)
      : await StargateClient.connect(nodeUrl);

    const transactionSignerFactory = hasRequiredSigningOptions
      ? await this.createTransactionSignerFactory(
        stargateClient as SigningStargateClient,
        options,
      )
      : createErrorTransactionSignerFactory();

    return new extendedConstructor(
      stargateClient,
      tmClient,
      transactionSignerFactory,
    );
  }

  protected static async createSigningStargateClient(
    nodeUrl: string,
    options: CosmosClientSigningOptions,
  ): Promise<SigningStargateClient> {
    const wallet = await createSecp256k1WalletFromPrivateKey(
      options.privateKey,
      options.walletPrefix,
    );

    return SigningStargateClient.connectWithSigner(
      nodeUrl,
      wallet,
      {
        gasPrice: options.gasPrice,
        broadcastPollIntervalMs: options.broadcastPollIntervalMs,
        broadcastTimeoutMs: options.broadcastTimeoutMs,
        registry: REGISTRY,
      },
    );
  }

  protected static async createTransactionSignerFactory(
    signingStargateClient: SigningStargateClient,
    options: Pick<CosmosClientSigningOptions, 'privateKey' | 'walletPrefix' | 'gasPrice'>
  ): Promise<TransactionSignerFactory> {
    const wallet = await createSecp256k1WalletFromPrivateKey(
      options.privateKey,
      options.walletPrefix,
    );

    const signerAddress = await wallet.getAccounts()
      .then((accounts) => accounts[0].address);

    return createTransactionSignerFactory(
      signingStargateClient,
      signerAddress,
      options.gasPrice,
      options.privateKey,
    );
  }

  public status(): Promise<StatusResponse> {
    return this.tmClient.status();
  }

  public disconnect(): void {
    this.stargateClient.disconnect();
    this.tmClient.disconnect();
  }
}
