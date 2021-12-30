import { BlockHeader, StargateClient } from '@cosmjs/stargate';
import { decodeTxRaw } from '@cosmjs/proto-signing';

import { DecodedBlock } from './types';

export class DecentrBlocksClient {
  private constructor(
    private stargateClient: StargateClient,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrBlocksClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    return new DecentrBlocksClient(stargateClient);
  }

  public disconnect(): void {
    this.stargateClient.disconnect();
  }

  public getBlock(height?: BlockHeader['height']): Promise<DecodedBlock> {
    return this.stargateClient.getBlock(height)
      .then((block) => ({
        ...block,
        txs: block.txs.map((tx) => decodeTxRaw(tx)),
      }));
  }
}
