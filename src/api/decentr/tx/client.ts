import {
  IndexedTx,
  SearchTxFilter,
  SearchTxQuery,
  StargateClient,
} from '@cosmjs/stargate';

import { DecodedIndexedTx } from './types';
import { decodeIndexedTx } from './utils';

export class DecentrTxClient {
  constructor(
    private readonly stargateClient: StargateClient,
  ) {
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
