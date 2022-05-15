import { TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { DecodedTxRaw } from '@cosmjs/proto-signing';

import { TypedEncodeObject } from './registry';

export { decodeTxRaw } from '@cosmjs/proto-signing';
export { Coin, DeliverTxResponse, GasPrice as Price } from '@cosmjs/stargate';

export const DECENTR_DENOM = 'udec';

export interface DecodedTxBody extends Omit<TxBody, 'messages'> {
  messages: TypedEncodeObject[];
}

export interface DecodedTx extends Omit<DecodedTxRaw, 'body'> {
  readonly body: DecodedTxBody;
}

export enum BroadcastErrorCode {
  Undefined = 1,
  ParseError,
  InvalidSequence,
  Unauthorized,
  InsufficientFunds,
  UnknownRequest,
  InvalidAddress,
  InvalidPubKey,
  UnknownAddress,
  InvalidCoins,
  OutOfGas,
  MemoTooLarge,
  InsufficientFee,
  TooManySignatures,
  NoSignatures,
  JSONMarshal,
  JSONUnmarshal,
  InvalidRequest,
  TxInMemPoolCache,
  MemPoolIsFull,
  TxTooLarge,
  Panic = 111_222,
}

export class BroadcastClientError {
  constructor(public readonly broadcastErrorCode: BroadcastErrorCode) {
  }
}
