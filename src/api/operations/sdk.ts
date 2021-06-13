import { Fee } from '../types';
import { getMinGasPrice } from './operations';

export class DecentrOperationsSDK {
  constructor(
    private apiUrl: string,
  ) {
  }

  public getMinGasPrice(): Promise<Fee> {
    return getMinGasPrice(this.apiUrl);
  }
}
