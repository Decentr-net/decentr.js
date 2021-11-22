import { getBlock, getLatestBlock } from './api';
import { Block, BlockHeader } from './types';

export class DecentrBlocksSDK {
  constructor(private nodeUrl: string) {
  }

  public getLatestBlock(): Promise<Block> {
    return getLatestBlock(this.nodeUrl);
  }

  public getBlock(height: BlockHeader['height']): Promise<Block> {
    return getBlock(this.nodeUrl, height);
  }
}
