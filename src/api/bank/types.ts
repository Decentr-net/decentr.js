import { BroadcastOptions } from '../messages';
import { StdTxResponse } from '../types';

export type QueryTransferResponse = StdTxResponse<'cosmos-sdk/MsgSend', {
  readonly amount: BankCoin[],
  readonly from_address: string,
  readonly to_address: string
}>;

export interface BankBroadcastOptions extends BroadcastOptions {
  readonly broadcast: true;
}

export interface BankCoin {
  readonly amount: string;
  readonly denom: string;
}
