import { BroadcastOptions } from '../messages';
import { StdTxResponse } from '../types';
import { Wallet } from '../../wallet';

export type QueryTransferResponse = StdTxResponse<'cosmos-sdk/MsgSend', TransferDataResponse>;

export interface BankBroadcastOptions extends BroadcastOptions {
  readonly broadcast: true;
  readonly privateKey: Wallet['privateKey'];
}

export interface BankCoin {
  readonly amount: string;
  readonly denom: string;
}

export interface TransferData {
  readonly amount: string;
  readonly from_address: Wallet['address'];
  readonly to_address: Wallet['address'];
}

export interface TransferDataResponse {
  readonly amount: BankCoin[];
  readonly from_address: Wallet['address'];
  readonly to_address: Wallet['address'];
}
