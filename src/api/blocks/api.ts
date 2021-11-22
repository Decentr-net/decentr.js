import { fetchJson } from '../../utils';
import { Block, BlockHeader } from './types';

export function getLatestBlock(
  nodeUrl: string,
): Promise<Block> {
  const url = `${nodeUrl}/cosmos/base/tendermint/v1beta1/blocks/latest`;

  return fetchJson(url);
}

export function getBlock(
  nodeUrl: string,
  height: BlockHeader['height'],
): Promise<Block> {
  const url = `${nodeUrl}/cosmos/base/tendermint/v1beta1/blocks/${height}`;

  return fetchJson(url);
}
