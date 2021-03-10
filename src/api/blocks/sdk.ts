import { getLatestBlock } from './blocks';
import { LatestBlock } from './types';

export class DecentrBlocksSDK {
  constructor(private apiUrl: string) {
  }

  public getLatestBlock(): Promise<LatestBlock> {
    return getLatestBlock(this.apiUrl);
  }
}
