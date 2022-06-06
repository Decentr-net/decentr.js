import { EncodeObject } from '@cosmjs/proto-signing';
import { DeliverTxResponse, GasPrice, SigningStargateClient } from '@cosmjs/stargate';

import { coerceArray } from '../../utils';
import { Wallet } from '../../wallet';
import { BroadcastClientError } from './types';

function castError(error: Error): DeliverTxResponse | never {
  const numberRegExp = new RegExp(/\d+/g);
  const regExpResult = numberRegExp.exec(error?.message);
  const codeString = regExpResult?.[0];
  const code = codeString && Number.parseInt(codeString);

  if (code) {
    throw new BroadcastClientError(code);
  }

  throw error;
}

export class TransactionSigner {
  private readonly gasAdjustment = 1.3;

  private readonly messages: EncodeObject[];

  constructor(
    private readonly signingStargateClient: SigningStargateClient,
    private readonly signerAddress: Wallet['address'],
    private readonly gasPrice: GasPrice,
    messages: EncodeObject | EncodeObject[],
  ) {
    this.messages = coerceArray(messages);
  }

  public simulate(memo?: string): Promise<number> {
    return this.signingStargateClient
      .simulate(this.signerAddress, this.messages, memo)
      .then((gas) => gas * +this.gasPrice.amount * this.gasAdjustment)
      .then((fee) => +fee.toFixed(6));
  }

  public async signAndBroadcast(memo?: string): Promise<DeliverTxResponse> {
    return this.signingStargateClient
      .signAndBroadcast(this.signerAddress, this.messages, this.gasAdjustment, memo)
      .catch(castError);
  }
}

export type TransactionSignerFactory = ((
  messages: EncodeObject | EncodeObject[],
) => TransactionSigner) | (() => never);

export const createErrorTransactionSignerFactory = (): TransactionSignerFactory => {
  return () => {
    throw new Error('No wallet provided to sign transactions');
  };
};

export const createTransactionSignerFactory = (
  signingStargateClient: SigningStargateClient,
  signerAddress: Wallet['address'],
  gasPrice: GasPrice,
): TransactionSignerFactory => (
  messages: EncodeObject | EncodeObject[],
): TransactionSigner => {
  return new TransactionSigner(signingStargateClient, signerAddress, gasPrice, messages)
};
