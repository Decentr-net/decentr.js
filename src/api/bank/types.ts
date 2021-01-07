import { Wallet } from '../../wallet';
import { BroadcastOptions, BroadcastSuccessResponse } from '../messages'
import { StdTxResponse } from '../types';

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

export interface TransferHistoryTxs extends BroadcastSuccessResponse {
  readonly timestamp: string;
  readonly tx: QueryTransferResponse;
}

export interface TransferHistoryResponse {
  readonly total_count: number;
  readonly count: number;
  readonly page_number: number;
  readonly page_total: number;
  readonly limit: number;
  readonly txs: TransferHistoryTxs[];
}

export interface TransferHistoryPaginationOptions {
  limit?: number;
  page?: number;
}

export interface TransferHistoryTransaction {
  amount: string;
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
