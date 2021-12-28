import { Coin } from '@cosmjs/stargate';

import { DecentrOperationsClient } from './client';

export async function getMinGasPrice(
  nodeUrl: string,
): Promise<Coin> {
  const operationsClient = await DecentrOperationsClient.create(nodeUrl);

  const result = await operationsClient.getMinGasPrice();

  operationsClient.disconnect();

  return result;
}
