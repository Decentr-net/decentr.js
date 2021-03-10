import { LatestBlock } from './types';
import { blockchainFetch } from '../api-utils';

export function getLatestBlock(
  apiUrl: string,
): Promise<LatestBlock> {
  return blockchainFetch(`${apiUrl}/blocks/latest`);
}
