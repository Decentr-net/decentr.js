import { Coin } from '@cosmjs/stargate';

import { fetchJson } from '../../utils';

export function getMinGasPrice(
  nodeUrl: string,
): Promise<Coin> {
  const url = `${nodeUrl}/decentr/operations/min-gas-price`;

  return fetchJson<{ min_gas_price: Coin }>(url)
    .then((response) => response.min_gas_price);
}
