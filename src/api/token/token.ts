import { Wallet } from '../../wallet';
import { blockchainFetch } from '../api-utils';
import { TokenBalance, TokenBalanceHistory, TokenPool } from './types';

export function getTokenBalance(
  apiUrl: string,
  walletAddress: Wallet['address'],
): Promise<TokenBalance> {
  return blockchainFetch<TokenBalance>(
    `${apiUrl}/token/balance/${walletAddress}`
  );
}

export function getTokenBalanceHistory(
  apiUrl: string,
  walletAddress: Wallet['address'],
): Promise<TokenBalanceHistory[]> {
  return blockchainFetch<TokenBalanceHistory[]>(`${apiUrl}/token/balance/${walletAddress}/history`)
    .then((history) => history || []);
}

export function getTokenPool(
  apiUrl: string,
): Promise<TokenPool> {
  return blockchainFetch(`${apiUrl}/token/pool`);
}
