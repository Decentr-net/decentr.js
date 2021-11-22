import { fetchJson } from '../../utils';
import { MintingInflation } from './types';

export function getInflation(
  nodeUrl: string,
): Promise<MintingInflation> {
  const url = `${nodeUrl}/cosmos/mint/v1beta1/inflation`;

  return fetchJson<{ inflation: MintingInflation }>(url)
    .then(({ inflation }) => inflation);
}
