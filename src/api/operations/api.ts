import { BroadcastTxResponse, Coin } from '@cosmjs/stargate';

import { fetchJson } from '../../utils';
import { createWalletFromPrivateKey, Wallet } from '../../wallet';
import { signAndBroadcast } from '../api-utils';

export function getMinGasPrice(
  nodeUrl: string,
): Promise<Coin> {
  const url = `${nodeUrl}/decentr/operations/min-gas-price`;

  return fetchJson<{ min_gas_price: Coin }>(url)
    .then((response) => response.min_gas_price);
}

export async function resetAccount(
  nodeUrl: string,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createWalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: '/decentr/operations/MsgResetAccount',
    value: {
      address: wallet.address,
      owner: wallet.address,
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}
