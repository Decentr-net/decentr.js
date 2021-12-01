export interface PDVBlacklist {
  cookieSource: string[];
}

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
  type: PDVType.AdvertiserId;
  advertiser: string;         // maxlength: 20
  name: string;               // maxlength: 100
  value: string;              // maxlength: 2048
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
  requestedBy?: PDVSource;
  timestamp: string;
}

export interface ProfileUpdate {
  avatar: string;
  bio: string;
  birthday: string;
  emails: string[];
  firstName: string;        // maxlength: 64
  gender: Gender;
  lastName: string;         // maxlength: 64
}

export interface ProfilePDV extends ProfileUpdate {
  type: PDVType.Profile;
}

export interface SearchHistoryPDV {
  type: PDVType.SearchHistory;
  domain: string;
  engine: string;           // maxlength: 20
  query: string;            // maxlength: 2000
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
