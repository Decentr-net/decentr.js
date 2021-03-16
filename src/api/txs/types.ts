import { Wallet } from '../../wallet';
import { StdTxResponse } from '../types';

export interface TXsSearchParams {
  limit?: number;
  messageAction?: string;
  messageSender?: Wallet['address'];
  page?: number;
  txMaxHeight?: number;
  txMinHeight?: number;
}

interface TransactionLogEventAttribute {
  readonly key: string;
  readonly value: string;
}

export interface TransactionLogEvent {
  readonly type: string;
  readonly attributes: TransactionLogEventAttribute[];
}

export interface TransactionLog {
  events: TransactionLogEvent[];
  msg_index: number;
  log: string;
}

export interface Transaction<TX extends StdTxResponse = StdTxResponse> {
  gas_used?: string;
  gas_wanted?: string;
  height: string;
  logs: TransactionLog[];
  raw_log: string;
  timestamp: string;
  tx: TX;
  txhash: string;
}

export interface TXsSearchResponse {
  count: number;
  limit: number;
  page_number: number;
  page_total: number;
  total_count: number;
  txs: Transaction[];
}
