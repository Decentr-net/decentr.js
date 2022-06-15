import { Bytes } from '@tendermint/types';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';

import { Wallet } from '../../wallet';
import { encodeObjectCharactersToUnicode } from '../crypto';
import { hashBody, hexToBytes } from '../convert';
import { sortObjectKeys } from '../object';

export function getSignature(
  target: unknown,
  privateKey: Wallet['privateKey'],
  options?: {
    disableEncode?: boolean,
  },
): Bytes {
  const targetToHash = (target as Bytes).byteLength
    ? target as Bytes
    : prepareObjectToHash(target, options);

  const hashBytes = hashBody(targetToHash);

  const privateKeyBytes = hexToBytes(privateKey);

  const signedObject = secp256k1EcdsaSign(hashBytes, privateKeyBytes);

  return signedObject.signature;
}

function prepareObjectToHash<T>(
  target: T,
  options?: {
    disableEncode?: boolean,
  },
): string {
  const stringToHash = typeof target === 'string'
    ? target
    : JSON.stringify(sortObjectKeys(target));

  return options?.disableEncode
    ? stringToHash
    : encodeObjectCharactersToUnicode(stringToHash, ['>', '<', '&']);
}
