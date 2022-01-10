import {
  IndexedTx,
  SearchTxFilter,
  SearchTxQuery,
  StargateClient,
} from '@cosmjs/stargate';

import { DecodedIndexedTx } from './types';
import { decodeIndexedTx } from './utils';

export class DecentrTxClient {
  private constructor(
    private stargateClient: StargateClient,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrTxClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    return new DecentrTxClient(stargateClient);
  }

  public disconnect(): void {
    return this.stargateClient.disconnect();
  }

  public search(
    query: SearchTxQuery,
    filter: SearchTxFilter = {},
  ): Promise<DecodedIndexedTx[]> {
    return this.stargateClient.searchTx(query, filter)
      .then((txs) => txs.map((tx) => decodeIndexedTx(tx)));
  }

  public getByHash(hash: IndexedTx['hash']): Promise<DecodedIndexedTx | undefined> {
    return this.stargateClient.getTx(hash)
      .then((tx) => tx
        ? decodeIndexedTx(tx)
        : undefined
      );
  }
}
