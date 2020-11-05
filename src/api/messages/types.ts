import { Fee, StdTxMessage } from '../types';

export interface StdMessageFee {
  readonly amount: Fee[];
  readonly gas: string;
}

export interface StdMessage {
  readonly msg: StdTxMessage[];
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

export interface BroadcastBody {
  readonly tx: SignedMessage;
  readonly mode: BroadcastMode;
}

export interface BroadcastResponse {
  readonly height: string;
  readonly logs: [];
  readonly raw_log: string;
  readonly txhash: string;
}
