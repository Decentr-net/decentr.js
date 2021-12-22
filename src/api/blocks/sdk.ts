import { Block, BlockHeader, StargateClient } from '@cosmjs/stargate';

export class DecentrBlocksSDK {
  private constructor(
    private stargateClient: StargateClient,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrBlocksSDK> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    return new DecentrBlocksSDK(stargateClient);
  }

  public getBlock(height?: BlockHeader['height']): Promise<Block> {
    return this.stargateClient.getBlock(height);
  }
}
