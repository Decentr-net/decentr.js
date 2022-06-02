import { BlockHeader, StargateClient } from '@cosmjs/stargate';

import { decodeTx } from '../../api-utils';
import { Block } from './types';

export class BlocksClient {
  constructor(
    private stargateClient: StargateClient,
  ) {
  }

  public getBlock(height?: BlockHeader['height']): Promise<Block> {
    return this.stargateClient.getBlock(height)
      .then((block) => ({
        ...block,
        txs: block.txs.map((tx) => decodeTx(tx)),
      }));
  }
}
