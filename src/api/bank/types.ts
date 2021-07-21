import { Wallet } from '../../wallet';
import { BroadcastOptions } from '../messages';
import { StdTxFee, StdTxMessageType, StdTxResponse } from '../types';
import { TXsSearchResponse } from '../txs';

export type QueryTransferResponse = StdTxResponse<StdTxMessageType.CosmosSend>;

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

export type TransferHistoryResponse = TXsSearchResponse<StdTxMessageType.CosmosSend>;

export interface TransferHistoryPaginationOptions {
  limit?: number;
  page?: number;
}

export type TransferRole = 'sender' | 'recipient';

export interface TransferHistoryTransaction {
  amount: BankCoin;
  fee: StdTxFee;
  recipient: Wallet['address'];
  sender: Wallet['address'];
  timestamp: string;
}

export interface TransferHistory {
  page: number;
  count: number;
  limit: number;
  totalCount: number;
  transactions: TransferHistoryTransaction[];
}
