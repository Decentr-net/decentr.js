import { publicKeyCreate } from 'secp256k1';

import { bytesToString, getUnicode, hexToBytes } from '../convert';
import { deepMapObjectStrings } from '../object';

export function getPublicKeyBase64(privateKeyHex: string): string {
  const privateKeyBytes = hexToBytes(privateKeyHex);
  const publicKeyBytes = publicKeyCreate(privateKeyBytes);

  return bytesToString(publicKeyBytes, 'base64');
}

export function encodeObjectCharactersToUnicode<T>(
  target: T,
  characters: string[],
): T {
  const mapFunction = (value: string) => {
    return [...value].map((character) => {
      return characters.includes(character)
        ? getUnicode(character)
        : character;
    }).join('');
  };

  return deepMapObjectStrings(target, mapFunction);
}

export function decodeObjectUnicode<T>(target: T): T {
  return deepMapObjectStrings(target, (value: string) => {
    return JSON.parse('"' + value.replace('"', '\\"') + '"');
  });
}
