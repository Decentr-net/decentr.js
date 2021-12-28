import { coin, EncodeObject, GeneratedType, Registry } from '@cosmjs/proto-signing';
import {
  Coin,
  DeliverTxResponse,
  GasPrice,
  isDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate';

import { coerceArray } from '../utils';
import { createSecp256k1WalletFromPrivateKey } from '../wallet';
import { getMinGasPrice } from './operations/standalone';
import { BroadcastClientError, DECENTR_DENOM } from './types';

export function createDecentrCoin(amount: number | string): Coin {
  return coin(amount, DECENTR_DENOM);
}

export function assertIsBroadcastSuccess(result: DeliverTxResponse): void {
  if (isDeliverTxSuccess(result)) {
    throw new BroadcastClientError(result.code);
  }
}

export async function signAndBroadcast(
  nodeUrl: string,
  messages: EncodeObject | EncodeObject[],
  privateKey: string,
  options?: {
    memo?: string,
    registry?: Registry,
  },
): Promise<DeliverTxResponse> {
  const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const gasPrice = GasPrice.fromString(minGasPrice.amount + minGasPrice.denom);

  const signingStargateClient = await SigningStargateClient.connectWithSigner(
    nodeUrl,
    wallet,
    {
      gasPrice,
      registry: options?.registry,
    },
  );

  const accounts = await wallet.getAccounts();

  const address = accounts[0].address;

  const result = await signingStargateClient.signAndBroadcast(
    address,
    coerceArray(messages),
    'auto',
    options?.memo,
  );

  signingStargateClient.disconnect();

  assertIsBroadcastSuccess(result);

  return result;
}

export function createCustomRegistry(msgMap: Map<GeneratedType, string>): Registry {
  return new Registry([
    ...[...msgMap.entries()]
      .map(([msg, url]) => [url, msg] as [string, GeneratedType]),
  ]);
}
