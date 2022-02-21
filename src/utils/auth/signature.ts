import { Bytes } from '@tendermint/types';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';

import { Wallet } from '../../wallet';
import { encodeObjectCharactersToUnicode } from '../crypto';
import { hashBody, hexToBytes } from '../convert';
import { sortObjectKeys } from '../object';

export function getSignature<T>(
  target: T,
  privateKey: Wallet['privateKey'],
  options?: {
    disableEncode?: boolean,
  },
): Bytes {
  let stringToHash = typeof target === 'string'
    ? target
    : JSON.stringify(sortObjectKeys(target));

  if (!options?.disableEncode) {
    stringToHash = encodeObjectCharactersToUnicode(stringToHash, ['>', '<', '&']);
  }

  const hashBytes = hashBody(stringToHash);

  const privateKeyBytes = hexToBytes(privateKey);

  const signedObject = secp256k1EcdsaSign(hashBytes, privateKeyBytes);

  return signedObject.signature;
}
