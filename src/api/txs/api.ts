import { IndexedTx, SearchTxFilter, SearchTxQuery, StargateClient } from '@cosmjs/stargate';

// export function searchTransactions(
//   nodeUrl: string,
//   parameters: TXsSearchParameters,
// ): Promise<TXsSearchResponse> {
//   return fetchJson<TXsSearchResponse>(
//     `${nodeUrl}/txs`,
//     {
//       queryParameters: {
//         limit: parameters?.limit,
//         'message.action': parameters?.messageAction,
//         'message.sender': parameters?.messageSender,
//         page: parameters?.page,
//         'transfer.recipient': parameters?.transferRecipient,
//         'transfer.sender': parameters?.transferSender,
//         'tx.maxheight': parameters?.txMaxHeight,
//         'tx.minheight': parameters?.txMinHeight,
//       },
//     },
//   );
// }

export async function searchTransactions(
  nodeUrl: string,
  query: SearchTxQuery,
  filter: SearchTxFilter = {},
): Promise<readonly IndexedTx[]> {
  const stargateClient = await StargateClient.connect(nodeUrl);

  const result = await stargateClient.searchTx(query, filter);

  stargateClient.disconnect();

  return result;
}

export async function getTransactionByHash(
  nodeUrl: string,
  hash: IndexedTx['hash'],
): Promise<IndexedTx | null> {
  const stargateClient = await StargateClient.connect(nodeUrl);

  const result = await stargateClient.getTx(hash);

  stargateClient.disconnect();

  return result;
}
