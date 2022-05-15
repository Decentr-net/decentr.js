import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { correctDecodedFloatNumber } from '../../../../utils';
import { Wallet } from '../../../../wallet';
import { setupTokenExtension } from './extension';

export class TokenClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupTokenExtension,
  );

  constructor(
    private tmClient: Tendermint34Client,
  ) {
  }

  public getBalance(walletAddress: Wallet['address']): Promise<string | undefined> {
    return this.queryClient.token.getBalance(walletAddress)
      .then((balance) => balance && correctDecodedFloatNumber(balance));
  }
}
