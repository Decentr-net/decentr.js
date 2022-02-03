import { PDVType } from '../pdv';

export interface PDVBlacklist {
  cookieSource: string[];
}

export type PDVRewards = Record<PDVType, string>;
