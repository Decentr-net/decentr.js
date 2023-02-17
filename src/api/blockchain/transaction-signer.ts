import { EncodeObject } from '@cosmjs/proto-signing';
import { DeliverTxResponse, GasPrice, SigningStargateClient, TimeoutError } from '@cosmjs/stargate';

import { coerceArray } from '../../utils';
import { Wallet } from '../../wallet';
import { BroadcastClientError, BroadcastUnknownError } from './types';

function castError(error: TimeoutError | Error): never {
  if (error instanceof TimeoutError) {
    throw error;
  }

  const numberRegExp = new RegExp(/\d+/g);
  const regExpResult = numberRegExp.exec(error?.message);
  const codeString = regExpResult?.[0];
  const code = codeString && Number.parseInt(codeString);

  if (code) {
    throw new BroadcastClientError(code, error?.message || '');
  }

  throw new BroadcastUnknownError(error.message);
}

export interface TransactionSignerExtraOptions {
  gasAdjustment?: number;
}

export class TransactionSigner {
  private static DEFAULT_GAS_ADJUSTMENT = 1.3;

  protected readonly messages: EncodeObject[];

  private readonly gasAdjustment;

  constructor(
    private readonly signingStargateClient: SigningStargateClient,
    private readonly signerAddress: Wallet['address'],
    private readonly gasPrice: GasPrice,
    messages: EncodeObject | EncodeObject[],
    extra?: TransactionSignerExtraOptions,
  ) {
    this.messages = coerceArray(messages);

    this.gasAdjustment = extra?.gasAdjustment || TransactionSigner.DEFAULT_GAS_ADJUSTMENT;
  }

  public simulate(memo?: string): Promise<number> {
    return this.signingStargateClient
      .simulate(this.signerAddress, this.messages, memo)
      .then((gas) => gas * +this.gasPrice.amount * this.gasAdjustment)
      .then((fee) => +fee.toFixed(6))
      .catch(castError);
  }

  public signAndBroadcast(memo?: string): Promise<DeliverTxResponse> {
    return this.signingStargateClient
      .signAndBroadcast(this.signerAddress, this.messages, this.gasAdjustment, memo)
      .catch(castError);
  }

  public concat(txSigner: TransactionSigner): TransactionSigner {
    return new TransactionSigner(
      this.signingStargateClient,
      this.signerAddress,
      this.gasPrice,
      [...this.messages, ...txSigner.messages],
    );
  }
}

export type TransactionSignerFactory = {
  getPrivateKey(): Wallet['privateKey'];
} & ({
  (messages: EncodeObject | EncodeObject[]): TransactionSigner;
} | {
  (): never;
});

const createSignerFactory = (
  func: Omit<TransactionSignerFactory, 'getPrivateKey'>,
  privateKey?: Wallet['privateKey'],
): TransactionSignerFactory => {
  const factory = func as TransactionSignerFactory;

  factory.getPrivateKey = () => {
    if (!privateKey) {
      throw new Error('No private key provided');
    }

    return privateKey;
  }

  return factory;
};

export const createErrorTransactionSignerFactory = (): TransactionSignerFactory => {
  return createSignerFactory(
    () => { throw new Error('No wallet provided to sign transactions') },
  );
};

export const createTransactionSignerFactory = (
  signingStargateClient: SigningStargateClient,
  signerAddress: Wallet['address'],
  gasPrice: GasPrice,
  privateKey: Wallet['privateKey'],
  extra?: TransactionSignerExtraOptions,
): TransactionSignerFactory => {
  return createSignerFactory(
    (messages: EncodeObject | EncodeObject[]): TransactionSigner => {
      return new TransactionSigner(signingStargateClient, signerAddress, gasPrice, messages, extra);
    },
    privateKey,
  );
}
