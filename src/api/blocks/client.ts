import { Block, BlockHeader, StargateClient } from '@cosmjs/stargate';

export class DecentrBlocksClient {
  private constructor(
    private stargateClient: StargateClient,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrBlocksClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    return new DecentrBlocksClient(stargateClient);
  }

  public getBlock(height?: BlockHeader['height']): Promise<Block> {
    return this.stargateClient.getBlock(height);
  }
}
