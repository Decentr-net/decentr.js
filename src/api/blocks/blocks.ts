import { Block, BlockHeader } from './types';
import { blockchainFetch } from '../api-utils';

export function getLatestBlock(
  apiUrl: string,
): Promise<Block> {
  return blockchainFetch(`${apiUrl}/blocks/latest`);
}

export function getBlock(
  apiUrl: string,
  height: BlockHeader['height'],
): Promise<Block> {
  return blockchainFetch(`${apiUrl}/blocks/${height}`);
}
