import { blockchainFetch } from '../api-utils';
import { MintingInflation } from './types';

export function getInflation(
  apiUrl: string,
): Promise<MintingInflation> {
  return blockchainFetch(`${apiUrl}/minting/inflation`);
}
