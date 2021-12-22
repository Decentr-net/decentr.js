import { Account, StargateClient } from '@cosmjs/stargate';

import { Wallet } from '../../wallet';

export class DecentrAuthClient {
  private constructor(
    private stargateClient: StargateClient,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrAuthClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    return new DecentrAuthClient(stargateClient);
  }

  public getAccount(walletAddress: Wallet['address']): Promise<Account | null> {
    return this.stargateClient.getAccount(walletAddress);
  }
}
