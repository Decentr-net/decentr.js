import { fetchJson } from '../../utils';
import { Transaction, TXsSearchParameters, TXsSearchResponse } from './types';

export function searchTransactions(
  nodeUrl: string,
  parameters: TXsSearchParameters,
): Promise<TXsSearchResponse> {
  return fetchJson<TXsSearchResponse>(
    `${nodeUrl}/txs`,
    {
      queryParameters: {
        limit: parameters?.limit,
        'message.action': parameters?.messageAction,
        'message.sender': parameters?.messageSender,
        page: parameters?.page,
        'transfer.recipient': parameters?.transferRecipient,
        'transfer.sender': parameters?.transferSender,
        'tx.maxheight': parameters?.txMaxHeight,
        'tx.minheight': parameters?.txMinHeight,
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
