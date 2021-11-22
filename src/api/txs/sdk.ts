import { IndexedTx, SearchTxFilter, SearchTxQuery } from '@cosmjs/stargate';

import { getTransactionByHash, searchTransactions } from './api';

export class DecentrTXsSDK {
  constructor(private nodeUrl: string) {
  }

  public search(
    query: SearchTxQuery,
    filter: SearchTxFilter = {},
  ): Promise<readonly IndexedTx[]> {
    return searchTransactions(this.nodeUrl, query, filter);
  }

  public getByHash(hash: IndexedTx['hash']): Promise<IndexedTx | null> {
    return getTransactionByHash(this.nodeUrl, hash);
  }
}
