import { StargateClient } from '@cosmjs/stargate';

import { Wallet } from '../../../../wallet';
import { Account } from './types';

export class AuthClient {
  constructor(
    private readonly stargateClient: StargateClient,
  ) {
  }

  public getAccount(walletAddress: Wallet['address']): Promise<Account | null> {
    return this.stargateClient.getAccount(walletAddress);
  }
}
