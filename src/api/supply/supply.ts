import { blockchainFetch } from '../api-utils';
import { TotalSupply } from './types';

export function getTotalSupply(
  apiUrl: string,
): Promise<TotalSupply[]> {
  return blockchainFetch(`${apiUrl}/supply/total`);
}

export function getCoinSupply(
  apiUrl: string,
  coinName: string,
): Promise<TotalSupply['amount']> {
  return blockchainFetch(`${apiUrl}/supply/total/${coinName}`);
}
