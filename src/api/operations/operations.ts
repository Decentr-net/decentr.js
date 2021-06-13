import { Fee } from '../types';
import { blockchainFetch } from '../api-utils';

export function getMinGasPrice(apiUrl: string): Promise<Fee> {
  return blockchainFetch(`${apiUrl}/operations/min-gas-price`);
}
