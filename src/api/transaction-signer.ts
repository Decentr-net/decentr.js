import { EncodeObject } from '@cosmjs/proto-signing';
import {
  DeliverTxResponse,
  GasPrice,
  isDeliverTxFailure,
  SigningStargateClient,
} from '@cosmjs/stargate';

import { createSecp256k1WalletFromPrivateKey } from '../wallet';
import { coerceArray } from '../utils';
import { getMinGasPrice } from './operations/standalone';
import { REGISTRY } from './registry';
import { BroadcastClientError } from './types';

function assertIsBroadcastSuccess(result: DeliverTxResponse): void {
  if (isDeliverTxFailure(result)) {
    throw new BroadcastClientError(result.code);
  }
}

interface SigningClientWrapper {
  readonly disconnect: () => void;

  readonly signAndBroadcast: () => Promise<DeliverTxResponse>;

  readonly simulate: () => Promise<number>;
}

export class TransactionSigner {

  private readonly gasAdjustment = 1.3;

  private readonly messages: EncodeObject[];

  private signingClientWrapper: SigningClientWrapper | undefined;

  constructor(
    private nodeUrl: string,
    messages: EncodeObject | EncodeObject[],
    private privateKey: string,
    private options?: {
      memo?: string,
    },
  ) {
    this.messages = coerceArray(messages);
  }

  public async simulate(): Promise<number> {
    const signingClientWrapper = await this.getSigningClientWrapper();

    return signingClientWrapper.simulate();
  }

  public async signAndBroadcast(): Promise<DeliverTxResponse> {
    const signingClientWrapper = await this.getSigningClientWrapper();

    const result = await signingClientWrapper.signAndBroadcast();

    assertIsBroadcastSuccess(result);

    return result;
  }

  private async getSigningClientWrapper(): Promise<SigningClientWrapper> {
    if (!this.signingClientWrapper) {
      this.signingClientWrapper = await this.createSingingClientWrapper();
    }

    return this.signingClientWrapper;
  }

  private async createSingingClientWrapper(): Promise<SigningClientWrapper> {
    const wallet = await createSecp256k1WalletFromPrivateKey(this.privateKey);

    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const gasPrice = GasPrice.fromString(minGasPrice.amount + minGasPrice.denom);

    const signingStargateClient = await SigningStargateClient.connectWithSigner(
      this.nodeUrl,
      wallet,
      {
        gasPrice,
        registry: REGISTRY,
      },
    );

    const accounts = await wallet.getAccounts();

    const walletAddress = accounts[0].address;

    return {
      disconnect: () => signingStargateClient.disconnect(),

      simulate: () => signingStargateClient
        .simulate(walletAddress, this.messages, this.options?.memo)
        .then((gas) => gas * +gasPrice.amount * this.gasAdjustment)
        .then((fee) => +fee.toFixed(6)),

      signAndBroadcast: () => signingStargateClient
        .signAndBroadcast(walletAddress, this.messages, this.gasAdjustment, this.options?.memo),
    };
  }
}
