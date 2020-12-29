import { StdTxResponse } from '../types';
import { BroadcastOptions } from '../messages'

export type QueryPDVResponse = StdTxResponse<'pdv/CreatePDV', PDVListItem>;

export interface PDVBroadcastOptions extends BroadcastOptions {
  broadcast: true;
}

export interface CerberusAddressResponse {
  readonly address: string;
}

export interface QueryPDVAddressResponse {
  readonly address: string
}

export interface PDVData {
  readonly version: string;
  readonly type: 'cookie';
  readonly name: string;
  readonly value: string;
  readonly domain: string;
  readonly host_only: boolean;
  readonly path: string;
  readonly secure: boolean
  readonly same_site: string;
  readonly expiration_date: number;
}

export interface PDV {
  readonly version: string;
  readonly pdv: {
    readonly domain: string;
    readonly path: string;
    readonly data: PDVData[];
    readonly user_agent: string;
  };
}

export enum PDVType {
  'Cookie' = 1,
  'LoginCookie',
}

export interface PDVListPaginationOptions {
  limit: number;
  from: number; // timestamp of PDVListItem
}

export interface PDVListItem {
  readonly timestamp: number;
  readonly address: string;
  readonly owner: string;
  readonly type: string;
}

export interface PDVDetails {
  readonly calculated_data: {
    readonly ip: string;
    readonly user_agent: string;
  };
  readonly user_data: PDV;
}

export interface PDVStatItem {
  date: string;
  value: number;
}

export interface PDVHeaders extends Record<string, string>{
  readonly 'Public-Key': string;
  readonly Signature: string;
}
