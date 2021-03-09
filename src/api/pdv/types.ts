export type PDVResponse = number;

export interface PDVData {
  readonly type: PDVDataType;
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
  domain: string;
  path: string;
  data: PDVData[];
}

export enum PDVDataType {
  Cookie = 'cookie',
  LoginCookie = 'login_cookie',
}

export interface PDVListPaginationOptions {
  limit: number;
  from: number; // timestamp of PDVListItem
}

export type PDVListItem = number;

export interface PDVDetails {
  version: string;
  pdv: PDV[];
}

export interface PDVMeta {
  object_types: Record<PDVDataType, number>;
  reward: number;
}

export interface PDVStatItem {
  date: string;
  value: number;
}

export interface PDVHeaders extends Record<string, string>{
  readonly 'Public-Key': string;
  readonly Signature: string;
}

export interface TokenBalanceResponse {
  readonly balance: number;
}
