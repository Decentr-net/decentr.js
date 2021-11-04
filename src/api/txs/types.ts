import { Wallet } from '../../wallet';
import { StdTx, StdTxMessageValueMap } from '../types';
import { BroadcastErrorCode } from '../messages';

export type TransactionActionType = 'send' | 'withdraw_delegator_reward';

export interface TXsSearchParameters {
  limit?: number;
  messageAction?: TransactionActionType | string;
  messageSender?: Wallet['address'];
  page?: number;
  txMaxHeight?: number;
  txMinHeight?: number;
  transferRecipient?: Wallet['address'];
  transferSender?: Wallet['address'];
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
  code: BroadcastErrorCode;
  gas_used?: string;
  gas_wanted?: string;
  height: string;
  logs: TransactionLog[];
  raw_log: string;
  timestamp: string;
  tx: StdTx<K>;
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
