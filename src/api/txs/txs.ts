import { fetchJson } from '../../utils';
import { Transaction, TXsSearchParams, TXsSearchResponse } from './types';

export function searchTransactions(nodeUrl: string, params: TXsSearchParams): Promise<TXsSearchResponse> {
  return fetchJson<TXsSearchResponse>(
    `${nodeUrl}/txs`,
    {
      queryParameters: {
        limit: params?.limit,
        'message.action': params?.messageAction,
        'message.sender': params?.messageSender,
        page: params?.page,
        'tx.maxheight': params?.txMaxHeight,
        'tx.minheight': params?.txMinHeight,
      },
    },
  );
}

export function getTransactionByHash(
  nodeUrl: string,
  hash: Transaction['txhash'],
): Promise<Transaction> {
  return fetchJson<Transaction>(`${nodeUrl}/txs/${hash}`);
}
