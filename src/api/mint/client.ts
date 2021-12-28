import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { MintExtension, setupMintExtension } from './extension';

export class DecentrMintClient {
  private constructor(
    private queryClient: QueryClient & MintExtension,
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrMintClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupMintExtension,
    );

    return new DecentrMintClient(queryClient, tendermintClient);
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }

  public getInflation(): Promise<Uint8Array> {
    return this.queryClient.mint.getInflation();
  }
}
