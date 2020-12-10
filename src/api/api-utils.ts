import { Bytes } from '@tendermint/types';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';

import {
  encodeObjectCharactersToUnicode,
  fetchJson,
  hashStringToBytes,
  hasOwnProperty,
  hexToBytes,
  sortObjectKeys
} from '../utils'
import { Wallet } from '../wallet';

export async function blockchainFetch<T>(url: string, queryParameters?: Partial<Record<string, string | number>>): Promise<T> {
  const response = await fetchJson<{ height: string; result: T } | T>(url, { queryParameters });

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
    : JSON.stringify(sortObjectKeys(target));

  const encodedToUnicode = encodeObjectCharactersToUnicode(stringToHash, ['>', '<', '&']);

  const hashBytes = hashStringToBytes(encodedToUnicode);

  const privateKeyBytes = hexToBytes(privateKey);

  const signedObject = secp256k1EcdsaSign(hashBytes, privateKeyBytes);
  return signedObject.signature;
}

export function createBaseRequest(
  { chainId: chain_id, walletAddress: from }: { chainId: string; walletAddress: Wallet['address'] },
): {
  base_req: {
    chain_id: string,
    from: Wallet['address'],
  },
} {
  return {
    base_req: {
      chain_id,
      from,
    },
  };
}
