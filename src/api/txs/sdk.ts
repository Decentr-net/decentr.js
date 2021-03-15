import { getTransactionByHash, searchTransactions } from './txs';
import { Transaction, TXsSearchParams, TXsSearchResponse } from './types';

export class DecentrTXsSDK {
  constructor(private nodeUrl: string) {
  }

  public search(params: TXsSearchParams): Promise<TXsSearchResponse> {
    return searchTransactions(this.nodeUrl, params);
  }

  public getByHash(hash: Transaction['txhash']): Promise<Transaction> {
    return getTransactionByHash(this.nodeUrl, hash);
  }
}
