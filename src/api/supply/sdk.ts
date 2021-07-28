import { getCoinSupply, getTotalSupply } from './supply';
import { TotalSupply } from './types';

export class DecentrSupplySDK {
  constructor(private apiUrl: string) {
  }

  public getTotalSupply(): Promise<TotalSupply[]> {
    return getTotalSupply(this.apiUrl);
  }

  public getCoinSupply(coinName: string): Promise<TotalSupply['amount']> {
    return getCoinSupply(this.apiUrl, coinName);
  }
}
