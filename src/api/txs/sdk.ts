import { getTransactionByHash, searchTransactions } from './txs';
import { Transaction, TXsSearchParameters, TXsSearchResponse } from './types';

export class DecentrTXsSDK {
  constructor(private nodeUrl: string) {
  }

  public search(parameters: TXsSearchParameters): Promise<TXsSearchResponse> {
    return searchTransactions(this.nodeUrl, parameters);
  }

  public getByHash(hash: Transaction['txhash']): Promise<Transaction> {
    return getTransactionByHash(this.nodeUrl, hash);
  }
}
