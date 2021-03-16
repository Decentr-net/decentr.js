import { Transaction } from '../txs'
import { Fee, StdTxMessage } from '../types';

export interface StdMessageFee {
  readonly amount: Fee[];
  readonly gas: string;
}

export interface StdMessage {
  readonly msgs: StdTxMessage[];
  readonly chain_id: string;
  readonly fee: StdMessageFee;
  readonly memo: string,
  readonly account_number: string;
  readonly sequence: string;
}

export interface SignedMessageSignaturePublicKey {
  readonly type: 'tendermint/PubKeySecp256k1';
  readonly value: string;
}

export interface SignedMessageSignature {
  readonly account_number: StdMessage['account_number'];
  readonly sequence: StdMessage['sequence'];
  readonly signature: string;
  readonly pub_key: SignedMessageSignaturePublicKey;
}

export interface SignedMessage {
  readonly msg: StdTxMessage[];
  readonly fee: StdMessageFee;
  readonly signatures: SignedMessageSignature[],
  readonly memo: StdMessage['memo'];
}

export type BroadcastMode = 'sync' | 'async' | 'block';

export interface BroadcastOptions {
  mode?: BroadcastMode;
  skipErrors?: boolean;
}

export interface BroadcastBody {
  readonly tx: SignedMessage;
  readonly mode: BroadcastMode;
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
  Panic = 111222,
}

export type BroadcastSuccessResponse = Omit<Transaction, 'timestamp' | 'tx'>;

export interface BroadcastErrorResponse extends Pick<Transaction, 'height' | 'raw_log' | 'txhash'> {
  readonly code: BroadcastErrorCode;
  readonly codespace: string;
}

export type BroadcastResponse = BroadcastSuccessResponse | BroadcastErrorResponse;

export class BroadcastClientError {
  constructor(public broadcastErrorCode: BroadcastErrorCode) {
  }
}
