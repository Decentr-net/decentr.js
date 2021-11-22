import { getInflation } from './api';
import { MintingInflation } from './types';

export class DecentrMintingSDK {
  constructor(private nodeUrl: string) {
  }

  public getInflation(): Promise<MintingInflation> {
    return getInflation(this.nodeUrl);
  }
}
