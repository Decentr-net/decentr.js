import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { bytesToDecimalString } from '../../../utils';
import { setupMintExtension } from './extension';

export class DecentrMintClient {
  private queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupMintExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
  ) {
  }

  public getInflation(): Promise<string> {
    return this.queryClient.mint.getInflation()
      .then(bytesToDecimalString);
  }
}
