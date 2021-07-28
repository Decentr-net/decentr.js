import { getInflation } from './minting';
import { MintingInflation } from './types';

export class DecentrMintingSDK {
  constructor(private apiUrl: string) {
  }

  public getInflation(): Promise<MintingInflation> {
    return getInflation(this.apiUrl);
  }
}
