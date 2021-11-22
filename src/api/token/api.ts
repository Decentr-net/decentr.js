import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { TokenBalance, TokenPool } from './types';

export function getTokenBalance(
  nodeUrl: string,
  walletAddress: Wallet['address'],
): Promise<TokenBalance> {
  const url = `${nodeUrl}/decentr/token/balance/${walletAddress}`;

  return fetchJson(url);
}

// TODO
// export function getTokenBalanceHistory(
//   nodeUrl: string,
//   walletAddress: Wallet['address'],
// ): Promise<TokenBalanceHistory[]> {
//   return blockchainFetch<TokenBalanceHistory[]>(`${nodeUrl}/token/balance/${walletAddress}/history`)
//     .then((history) => history || []);
// }

export function getTokenPool(
  nodeUrl: string,
): Promise<TokenPool> {
  const url = `${nodeUrl}/decentr/token/pool`;

  return fetchJson(url);
}
