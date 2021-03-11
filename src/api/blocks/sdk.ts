import { getBlock, getLatestBlock } from './blocks';
import { Block, BlockHeader } from './types';

export class DecentrBlocksSDK {
  constructor(private apiUrl: string) {
  }

  public getLatestBlock(): Promise<Block> {
    return getLatestBlock(this.apiUrl);
  }

  public getBlock(height: BlockHeader['height']): Promise<Block> {
    return getBlock(this.apiUrl, height);
  }
}
