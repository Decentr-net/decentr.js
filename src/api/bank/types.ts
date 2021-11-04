import { Wallet } from '../../wallet';
import { BroadcastOptions } from '../messages';
import { DenomAmount, StdTxMessageType, StdTxResponse } from '../types';

export type QueryTransferResponse = StdTxResponse<StdTxMessageType.CosmosSend>;

export interface BankBroadcastOptions extends BroadcastOptions {
  readonly broadcast: true;
  readonly privateKey: Wallet['privateKey'];
}

export type BankCoin = DenomAmount;

export interface TransferData {
  readonly comment?: string;
  readonly amount: string;
  readonly from_address: Wallet['address'];
  readonly to_address: Wallet['address'];
}
