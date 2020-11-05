import { Wallet } from '../wallet';

export interface Fee {
  readonly amount: string;
  readonly denom: string;
}

export interface StdTxFee {
  readonly amount: Fee[];
  readonly gas: string;
}

export interface StdTxMessage<T extends string = string, V = unknown> {
  readonly type: T;
  readonly value: {
    readonly owner: Wallet['address'],
  } & V;
}

export interface StdTxResponseValue<T extends string = string, V = unknown> {
  readonly fee: StdTxFee;
  readonly memo: string;
  readonly msg: StdTxMessage<T, V>[];
  readonly signatures: null;
}

export interface StdTxResponse<T extends string = string, V = unknown> {
  readonly type: 'cosmos-sdk/StdTx';
  readonly value: StdTxResponseValue<T, V>
}
