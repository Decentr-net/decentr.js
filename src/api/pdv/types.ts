export type PDVAddress = number;

export enum PDVType {
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

export interface PDVSource {
  host: string;
  path: string;
}

export interface AdvertiserPDV {
  type: PDVType.AdvertiserId,
  advertiser: string;
  id: string;
}

export interface CookiePDV {
  type: PDVType.Cookie;
  secure: boolean;
  domain: string;
  expirationDate?: number;
  hostOnly: boolean;
  name: string;
  path: string;
  sameSite: string;
  source: PDVSource;
  timestamp: string;
  value: string;
}

export interface LocationPDV {
  type: PDVType.Location;
  latitude: number;
  longitude: number;
  requestedBy: PDVSource;
  timestamp: string;
}

export interface ProfilePDV {
  type: PDVType.Profile;
  avatar: string;
  bio: string;
  birthday: string;
  emails: string[];
  firstName: string;
  gender: Gender;
  lastName: string;
}

export interface SearchHistoryPDV {
  type: PDVType.SearchHistory;
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
  object_types: Record<PDVType, number>;
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
