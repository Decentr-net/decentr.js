import { Bytes } from '@tendermint/types';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';

import {
  fetchJson,
  hashStringToBytes,
  hasOwnProperty,
  hexToBytes,
  sortObjectKeys,
} from '../utils';
import { Wallet } from '../wallet';

export async function blockchainFetch<T>(url: string): Promise<T> {
  const response = await fetchJson<{ height: string; result: T } | T>(url);

  if (hasOwnProperty(response, 'height') &&
    hasOwnProperty(response, 'result')
  ) {
    return (response as { result: T }).result;
  }

  return response as T;
}

export function getSignature<T>(
  target: T,
  privateKey: Wallet['privateKey'],
): Bytes {
  const stringToHash = typeof target === 'string'
    ? target
    : JSON.stringify(sortObjectKeys(target))

  const hashBytes = hashStringToBytes(stringToHash);

  const privateKeyBytes = hexToBytes(privateKey);

  const signedObject = secp256k1EcdsaSign(hashBytes, privateKeyBytes);
  return signedObject.signature;
}
