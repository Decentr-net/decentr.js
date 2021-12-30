import { TxMessageValueMap } from './registry';

export const DECENTR_DENOM = 'udec';

export type TxMessageValue<K extends keyof TxMessageValueMap> = TxMessageValueMap[K];

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
