import { Wallet } from '../../wallet';
import { StdTxMessageValueMap, StdTxResponse } from '../types';

export interface TXsSearchParameters {
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

export interface Transaction<K extends keyof StdTxMessageValueMap = keyof StdTxMessageValueMap> {
  gas_used?: string;
  gas_wanted?: string;
  height: string;
  logs: TransactionLog[];
  raw_log: string;
  timestamp: string;
  tx: StdTxResponse<K>;
  txhash: string;
}

export interface TXsSearchResponse<K extends keyof StdTxMessageValueMap = keyof StdTxMessageValueMap> {
  count: number;
  limit: number;
  page_number: number;
  page_total: number;
  total_count: number;
  txs: Transaction<K>[];
}
