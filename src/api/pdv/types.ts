export type PDVAddress = number;

export enum PDVDataType {
  AdvertiserId = 'advertiserId',
  Cookie = 'cookie',
  Location = 'location',
  Profile = 'profile',
  SearchHistory = 'searchHistory',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface PDVDataSource {
  host: string;
  path: string;
}

export interface AdvertiserPDV {
  type: PDVDataType.AdvertiserId,
  advertiser: string;
  id: string;
}

export interface CookiePDV {
  type: PDVDataType.Cookie;
  domain: string;
  expirationDate: number;
  hostOnly: boolean;
  name: string;
  path: string;
  sameSite: string;
  source: PDVDataSource;
  timestamp: string;
  value: string;
}

export interface LocationPDV {
  type: PDVDataType.Location;
  latitude: number;
  longitude: number;
  requestedBy: PDVDataSource;
  timestamp: string;
}

export interface ProfilePDV {
  type: PDVDataType.Profile;
  avatar: string;
  bio: string;
  birthday: string;
  emails: string[];
  firstName: string;
  gender: Gender;
  lastName: string;
}

export interface SearchHistoryPDV {
  type: PDVDataType.SearchHistory;
  engine: string;
  query: string;
  timestamp: string;
}

export type PDV = AdvertiserPDV
  | CookiePDV
  | LocationPDV
  | ProfilePDV
  | SearchHistoryPDV;

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
